/* eslint-disable no-undef */

const DIRECTION = {
  ROW: 'row',
  COL: 'col',
};

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

const platform =
  navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
const isMacOS = platform.includes('macOS');

export const getCompatibleKey = (keyEvent) => {
  const { altKey, metaKey, key } = keyEvent;
  if (!isMacOS) {
    return key;
  }

  if (metaKey) {
    if (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT) return KEYS.HOME;
    if (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_RIGHT) return KEYS.END;
  }
  if (altKey) {
    if (key === KEYS.ARROW_UP || key === KEYS.ARROW_LEFT) return KEYS.PAGE_UP;
    if (key === KEYS.ARROW_DOWN || key === KEYS.ARROW_RIGHT)
      return KEYS.PAGE_DOWN;
  }
  return key;
};

export const arrowNavigation = (direction, focusableElements, key) => {
  const activeElementIdx = focusableElements.findIndex(
    (element) => element === document.activeElement
  );
  if (activeElementIdx === -1) {
    return;
  }

  const moveForward = key.includes(
    direction === DIRECTION.ROW ? KEYS.ARROW_RIGHT : KEYS.ARROW_DOWN
  );

  const nextActiveElementIdx = moveForward
    ? activeElementIdx + 1
    : activeElementIdx - 1;

  focusableElements[nextActiveElementIdx]?.focus();
};
