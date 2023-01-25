/* eslint-disable no-undef */

export const KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  SHIFT: 'Shift',
  CONTROL: 'Control',
  ALT: 'Alt',
  META: 'Meta',
  ENTER: 'Enter',
  TAB: 'Tab',
  END: 'End',
  HOME: 'Home',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  ESCAPE: 'Escape',
};

export const getCompatibleKey = (keyEvent: React.KeyboardEvent<HTMLUListElement | HTMLOListElement>): string => {
  const { altKey, metaKey, key } = keyEvent;

  const isWindows = navigator?.userAgent.toLowerCase().includes('windows');
  if (isWindows) {
    return key;
  }

  if (metaKey) {
    if (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT) return KEYS.HOME;
    if (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_RIGHT) return KEYS.END;
  }
  if (altKey) {
    if (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT) return KEYS.PAGE_UP;
    if (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_RIGHT) return KEYS.PAGE_DOWN;
  }
  return key;
};

export const moveFocus = (focusables: HTMLElement[], step: number): void => {
  const lastElementIdx = focusables.length - 1;
  const activeElementIdx = focusables.findIndex((element) => element === document.activeElement);
  if (activeElementIdx === -1) {
    return;
  }

  let nextActiveElementIdx = activeElementIdx + step;
  if (nextActiveElementIdx < 0) nextActiveElementIdx = 0;
  if (nextActiveElementIdx > lastElementIdx) nextActiveElementIdx = lastElementIdx;

  focusables[nextActiveElementIdx].focus();
};

export const arrowNavigation = (key: string, focusables: HTMLElement[], direction: 'row' | 'col'): void => {
  if ((direction === 'row' && key === KEYS.ARROW_LEFT) || (direction === 'col' && key === KEYS.ARROW_UP)) {
    moveFocus(focusables, -1);
  }
  if ((direction === 'row' && key === KEYS.ARROW_RIGHT) || (direction === 'col' && key === KEYS.ARROW_DOWN)) {
    moveFocus(focusables, 1);
  }
};
