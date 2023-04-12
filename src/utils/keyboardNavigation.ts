/* eslint-disable no-undef */
export type Direction = 'row' | 'col' | 'none';

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
} as const;

export type KeyOfKEYS = keyof typeof KEYS;
export type ValueOfKEYS = (typeof KEYS)[KeyOfKEYS];

export const COMBINATION_KEYS = {
  CTRL_HOME: 'Control+Home',
  CTRL_END: 'Control+End',
} as const;

export type KeyOfCombinationKeys = keyof typeof COMBINATION_KEYS;
export type ValueOfCombinationKeys = (typeof COMBINATION_KEYS)[KeyOfCombinationKeys];

export const NAVIGATION_KEYS = [
  KEYS.ARROW_UP,
  KEYS.ARROW_DOWN,
  KEYS.ARROW_LEFT,
  KEYS.ARROW_RIGHT,
  KEYS.HOME,
  KEYS.END,
  KEYS.PAGE_UP,
  KEYS.PAGE_DOWN,
];

export const getCompatibleKey = (keyEvent: React.KeyboardEvent<HTMLElement>): string => {
  const { metaKey, key } = keyEvent;

  const isWindows = navigator?.userAgent.toLowerCase().includes('windows');
  if (isWindows) {
    return key;
  }

  if (metaKey) {
    if (key === KEYS.ARROW_UP) return KEYS.HOME;
    if (key === KEYS.ARROW_DOWN) return KEYS.END;
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

export const arrowNavigation = (key: string, focusables: HTMLElement[], direction: Direction): void => {
  if (
    (direction === 'row' && key === KEYS.ARROW_LEFT) ||
    (direction === 'col' && key === KEYS.ARROW_UP) ||
    (direction === 'none' && (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT))
  ) {
    moveFocus(focusables, -1);
  }
  if (
    (direction === 'row' && key === KEYS.ARROW_RIGHT) ||
    (direction === 'col' && key === KEYS.ARROW_DOWN) ||
    (direction === 'none' && (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_RIGHT))
  ) {
    moveFocus(focusables, 1);
  }
};
