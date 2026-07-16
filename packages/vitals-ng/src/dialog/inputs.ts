/* eslint-disable @typescript-eslint/no-explicit-any -- generic inference requires `any` here, and it's internal */
import { InputSignalWithTransform } from '@angular/core';

type InputValue<S> =
  S extends InputSignalWithTransform<any, infer WriteType> ? WriteType : never;

/** Keys of `Component` that are signal inputs (`input()`/`input.required()`/`model()`). */
type InputKey<T> = {
  [K in keyof T]: T[K] extends InputSignalWithTransform<any, any> ? K : never;
}[keyof T];

/**
 * The subset of `Component`'s properties that are signal inputs, mapped to the plain value each
 * one accepts (so `DialogConfig#inputs` can only reference actual inputs of the opened component).
 */
export type Inputs<T> = {
  [K in InputKey<T>]?: InputValue<T[K]>;
};
