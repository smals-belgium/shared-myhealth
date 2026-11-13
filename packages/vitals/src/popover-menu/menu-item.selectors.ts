import type { Anchor, Button } from '../button';

export const getAllOptions = (host: HTMLElement, selector = '') =>
  host.querySelectorAll<Button | Anchor>(
    `mh-button${selector},mh-a${selector}`,
  );

const getEnabledOptions = (host: HTMLElement) =>
  getAllOptions(host, ':not([disabled])');

export const numOptions = (host: HTMLElement) => getAllOptions(host).length;
export const hasEnabledOptions = (host: HTMLElement) =>
  getEnabledOptions(host).length > 0;

const getOption = (host: HTMLElement, selector: string) =>
  host.querySelector<Button | Anchor>(`mh-button${selector},mh-a${selector}`);

export const getOptionAt = (host: HTMLElement, index: number) =>
  getAllOptions(host).item(index);

const getOptionIndex = (host: HTMLElement, option: Button | Anchor) =>
  Array.from(getAllOptions(host)).indexOf(option);

const getActiveOption = (host: HTMLElement) => getOption(host, ':focus');

export const getActiveIndex = (host: HTMLElement) => {
  const activeOption = getActiveOption(host);
  return activeOption ? getOptionIndex(host, activeOption) : 0;
};

export const getFirstEnabledOption = (host: HTMLElement) =>
  getOption(host, ':not([disabled])');

export const getLastEnabledOption = (host: HTMLElement) =>
  Array.from(getEnabledOptions(host)).at(-1);
