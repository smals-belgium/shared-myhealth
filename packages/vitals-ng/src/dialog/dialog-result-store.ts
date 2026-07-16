const resultKeyPrefix = 'mh-dialog-result:' as const;

type ResultKey = `${typeof resultKeyPrefix}${string}`;

const createResultKey = (): ResultKey =>
  `${resultKeyPrefix}${crypto.randomUUID()}`;

const isResultKey = (key: unknown): key is ResultKey =>
  typeof key === 'string' && key.startsWith(resultKeyPrefix);

export type AfterClosed<R> =
  | {
      reason: 'cancel';
    }
  | {
      reason: 'native';
      value: string | boolean | undefined;
    }
  | {
      reason: 'programmatic';
      value: R;
    };

/**
 * The mh-dialog Lit component can only deal with `string | boolean` as a return value when closing.
 * This makes sense from the way it's natively used.
 *
 * However when dynamically creating Angular components wrapped in dialog instances through the DialogService,
 * the usage pattern is different and may call for more complex data types to be passed when the dialog is closed.
 *
 * This store provides an internal solution for that difference.
 * When a dialog is programmatically closed, any value type can be passed. This value is stored here and the
 * a unique key is passed into the Lit close event. When the Lit dialog emits that event, we can retrieve the
 * original value and put it on the afterClosed$ Observable.
 *
 * When the dialog is closed by any other means (internal mh-dialog triggers or mh-dialog-close directive),
 * the original flow is respected. The value can only be `string | boolean | undefined`.
 */
export const resultStore = <R>() => {
  const results: Map<ResultKey, R> = new Map();

  return {
    /**
     * Stores the value with a unique key and returns that key for later recovery.
     * If the value is undefined, so is the key.
     */
    push(value?: R) {
      if (value === undefined) return undefined;

      const key = createResultKey();
      results.set(key, value);
      return key;
    },

    /**
     * Returns the stored value for the given key and removes it from the store.
     * If the key is not a ReturnKey, it's considered the value.
     */
    pop(key?: string | boolean): AfterClosed<R> {
      if (!isResultKey(key)) return { reason: 'native', value: key };

      const value = results.get(key) as R;
      results.delete(key);
      return { reason: 'programmatic', value };
    },
  };
};
