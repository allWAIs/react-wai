/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  GridColumn,
  getGridStyles,
  validateRole,
  GRID_ITEM_CLASSNAME,
  getRole,
  GridTables,
  getGridTables,
  GridNavigators,
  getGridNavigators,
} from './utils';
import {
  Breakpoint,
  breakpointKeys,
  Breakpoints,
  getCompatibleKey,
  getFocusableChildren,
  getPriorBreakpoint,
  getTabbableChildren,
  KEYS,
  NAVIGATION_KEYS,
  removeTabbable,
  restoreTabbable,
  subscribeMediaQuery,
} from '../utils';

export interface GridProps extends PropsWithHTMLAttr<HTMLDivElement> {
  /**
   * If true, this component will be a flex container. It can be used with 'item' prop.
   */
  container?: boolean;
  /**
   * If true, this component will be a grid-item.
   * It is used for stable layout.
   */
  item?: boolean;
  /**
   * Determines the flex-direction style property. It is applied for all screen sizes.
   * It has nothing to do with keyboard navigation.
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * Sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container.
   * The value is applied for the xs breakpoint and wider screens if not overridden.
   */
  xs?: GridColumn;
  /**
   * Sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container.
   * The value is applied for the sm breakpoint and wider screens if not overridden.
   */
  sm?: GridColumn;
  /**
   * Sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container.
   * The value is applied for the md breakpoint and wider screens if not overridden.
   */
  md?: GridColumn;
  /**
   * Sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container.
   * The value is applied for the lg breakpoint and wider screens if not overridden.
   */
  lg?: GridColumn;
  /**
   * Sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container.
   * The value is applied for the xl breakpoint and wider screens if not overridden.
   */
  xl?: GridColumn;
  /**
   * Determines the space between the type item components.
   * It can only be used on a type container component.
   */
  spacing?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Grid(props: GridProps): JSX.Element {
  const { container, item, xs, sm, md, lg, xl, className, children, ...restProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const breakpointStatusRef = useRef<Breakpoints<boolean>>({
    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });
  const breakpointRef = useRef<Breakpoint>('xs');

  validateRole({ container, item });

  const role = getRole({ container, item });

  let $gridTables: GridTables;
  let navigators: GridNavigators;

  let $tabbableChildren: HTMLElement[] = [];

  useEffect(() => {
    const $container = containerRef.current;

    if ((role === 'container' || role === 'both') && $container) {
      $gridTables = getGridTables($container);
      navigators = getGridNavigators($gridTables);
    }

    if (role === 'item' && $container) {
      $tabbableChildren = getTabbableChildren($container);
    }
  }, [children, container, item]);

  useEffect(() => {
    const $container = containerRef.current;

    if ((role === 'container' || role === 'both') && $container) {
      const updateBreakpoint = (mediaQueryList: MediaQueryList, breakpoint: Breakpoint): void => {
        breakpointStatusRef.current[breakpoint] = mediaQueryList.matches;
        breakpointRef.current = getPriorBreakpoint(breakpointStatusRef.current);
        console.log($gridTables, breakpointRef.current);
      };

      const breakpoints = breakpointKeys;
      const unsubscribes = breakpoints.map((breakpoint) => subscribeMediaQuery(breakpoint, updateBreakpoint));

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    }
  }, [children, container]);

  const handleFocus = (e: React.FocusEvent<HTMLElement>): void => {
    const { target, currentTarget } = e;

    if (role === 'container' || role === 'both') {
      const $gridTable = $gridTables[breakpointRef.current];
      if (!$gridTable) return;

      const $gridItems = $gridTable.flat();
      const isGridItem = $gridItems.includes(target);
      if (isGridItem) {
        $gridItems.forEach(($item) => {
          if ($item === target) {
            restoreTabbable($item);
            getFocusableChildren($item).forEach(restoreTabbable);
          } else {
            removeTabbable($item);
            getFocusableChildren($item).forEach(removeTabbable);
          }
        });
      }
    }

    if (role === 'item' && $tabbableChildren) {
      if (target === currentTarget) {
        $tabbableChildren.forEach(restoreTabbable);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>): void => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      role === 'container' ? restoreTabbable(e.target) : $tabbableChildren.forEach(removeTabbable);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    const key = getCompatibleKey(e);
    if (!NAVIGATION_KEYS.includes(key) || role === 'item' || e.target === e.currentTarget) return;

    const navigator = navigators[breakpointRef.current];
    if (!navigator) return;

    e.preventDefault();
    if (key === KEYS.ARROW_UP) navigator.up();
    else if (key === KEYS.ARROW_DOWN) navigator.down();
    else if (key === KEYS.ARROW_LEFT) navigator.left();
    else if (key === KEYS.ARROW_RIGHT) navigator.right();

    e.stopPropagation();
  };

  const { containerCss, itemCss } = getGridStyles(props);

  return (
    <Div
      ref={containerRef}
      role={container ? 'grid' : 'gridcell'}
      css={[containerCss, itemCss]}
      className={`${item ? GRID_ITEM_CLASSNAME : ''} ${className ?? ''}`}
      tabIndex={item ? 0 : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-r-wai-grid-xs={item && xs}
      data-r-wai-grid-sm={item && sm}
      data-r-wai-grid-md={item && md}
      data-r-wai-grid-lg={item && lg}
      data-r-wai-grid-xl={item && xl}
      {...restProps}
    >
      {children}
    </Div>
  );
}

interface Div extends PropsWithHTMLAttr<HTMLDivElement> {
  css: Array<ReturnType<typeof css>>;
}
const Div = styled.div<Div>`
  box-sizing: border-box;
`;
