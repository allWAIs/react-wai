/* eslint-disable no-undef */
const focusableSelector = `
  a[href], 
  area[href], 
  button, 
  input, 
  select, 
  textarea, 
  iframe, 
  summary, 
  details, 
  video[controls], 
  audio[controls], 
  [contenteditable=""], 
  [contenteditable="true"], 
  [tabindex]
`
  .replace(/\n\s+/g, '')
  .trim();

const tabbableSelector = focusableSelector.replace(/\[tabindex\]/, '[tabindex]:not([tabindex^="-"])');

export const isFocusableElement = (Element: HTMLElement): boolean => {
  const $wrapper = document.createElement('div');
  $wrapper.append(Element);
  return Boolean($wrapper.querySelector(focusableSelector));
};

export const getFocusableChild = (Element: HTMLElement): HTMLElement | null => Element.querySelector(focusableSelector);

export const getFocusableChildren = (Element: HTMLElement): HTMLElement[] =>
  Array.from(Element.querySelectorAll(focusableSelector));

export const getTabbableChildren = (Element: HTMLElement): HTMLElement[] =>
  Array.from(Element.querySelectorAll(tabbableSelector));

export const removeTabbable = (Element: HTMLElement): void => Element.setAttribute('tabindex', '-1');
export const restoreTabbable = (Element: HTMLElement): void => Element.setAttribute('tabindex', '0');
export const toggleTabbable = (Element: HTMLElement, force: boolean | undefined): void => {
  if (force === undefined) {
    Element.setAttribute('tabindex', Element.getAttribute('tabindex') === '0' ? '-1' : '0');
  } else {
    force ? restoreTabbable(Element) : removeTabbable(Element);
  }
};
