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

const tabbableSelector = focusableSelector.replace(
  /\[tabindex\]/,
  '[tabindex]:not([tabindex^="-"])'
);

export const isFocusableElement = (Element: HTMLElement) => {
  const $wrapper = document.createElement('div');
  $wrapper.append(Element);
  return Boolean($wrapper.querySelector(focusableSelector));
};

export const getFocusableChild = (Element: HTMLElement) =>
  Element.querySelector(focusableSelector);

export const getFocusableChildren = (Element: HTMLElement) =>
  Array.from(Element.querySelectorAll<HTMLElement>(focusableSelector));

export const getTabbableChildren = (Element: HTMLElement) =>
  Array.from(Element.querySelectorAll<HTMLElement>(tabbableSelector));

export const removeTabbable = (Element: HTMLElement) =>
  Element.setAttribute('tabindex', '-1');
export const restoreTabbable = (Element: HTMLElement) =>
  Element.setAttribute('tabindex', '0');
export const toggleTabbable = (
  Element: HTMLElement,
  force: boolean | undefined
) => {
  if (force === undefined) {
    Element.setAttribute(
      'tabindex',
      Element.getAttribute('tabindex') === '0' ? '-1' : '0'
    );
  } else {
    force ? restoreTabbable(Element) : removeTabbable(Element);
  }
};
