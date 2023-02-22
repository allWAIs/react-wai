/* eslint-disable no-undef */

export const generateUUID = (): string => {
  let uuid = '';

  if (typeof self.crypto !== 'undefined') {
    uuid = self.crypto.randomUUID();
  } else {
    uuid = Date.now() + '';
  }

  return uuid.slice(0, 8);
};
