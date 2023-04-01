export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Breakpoints<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export interface MediaQueries {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export const breakpointKeys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const breakpoints: Breakpoints<number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const getPriorBreakpoint = (breakpoints: Breakpoints<boolean>): Breakpoint => {
  const breakpointsKeys: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];
  return breakpointsKeys.find((bp) => breakpoints[bp]) ?? 'xs';
};

const getMediaQuery = (breakpoint: Breakpoint): string => `@media (min-width: ${breakpoints[breakpoint]}px)`;

export const getMediaQueries = (breakpoints: Breakpoints<boolean>): MediaQueries =>
  Object.fromEntries(
    Object.entries(breakpoints)
      .filter(([, isValid]) => isValid)
      .map(([key]) => [key, getMediaQuery(key as Breakpoint)])
  );

export const subscribeMediaQuery = (
  breakpoint: Breakpoint,
  callback: (mediaQueryList: MediaQueryList, breakpoint: Breakpoint) => void
): (() => void) => {
  const mediaQueryString = getMediaQuery(breakpoint).replace('@media ', '');
  const mediaQueryList = window.matchMedia(mediaQueryString);

  if (mediaQueryList.matches) {
    callback(mediaQueryList, breakpoint);
  }

  const handler = () => {
    callback(mediaQueryList, breakpoint);
  };

  mediaQueryList.addEventListener('change', handler);

  return (): void => {
    mediaQueryList.removeEventListener('change', handler);
  };
};
