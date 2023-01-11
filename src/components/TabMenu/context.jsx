import { createContext, useContext } from 'react';

export const TabContext = createContext();
TabContext.displayName = 'Tab';

export const useDirection = () => {
  const { direction } = useContext(TabContext);
  return direction;
};
