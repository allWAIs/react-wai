import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { getFocusableChildren, KEYS, getCompatibleKey, arrowNavigation } from '../utils';

const NAVIGATION_KEYS = [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.HOME, KEYS.END];

export interface ListProps extends PropsWithHTMLAttr<HTMLUListElement | HTMLOListElement> {
  /**
   * Determine type of list tag
   */
  as: 'ul' | 'ol';
  /**
   * Determine logical/visual direction of list.
   * if direction is row, use arrowleft/arrowright key to move forward/backward
   * if direction is col, use arrowup/arrowdown key to move forward/backward
   */
  direction: 'row' | 'col';
  children: React.ReactNode;
  [key: string]: unknown;
}

export function List({ as, direction, children, ...restProps }: ListProps): JSX.Element {
  const containerRef = useRef<HTMLUListElement | HTMLOListElement>(null);

  let listItems: HTMLElement[] = [];

  useEffect(() => {
    const $container = containerRef.current;
    if ($container) {
      listItems = getFocusableChildren($container);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement | HTMLOListElement>): void => {
    const key = getCompatibleKey(e);
    if (!NAVIGATION_KEYS.includes(key)) return;

    e.preventDefault();

    switch (key) {
      case KEYS.HOME:
        !e.ctrlKey && listItems[0].focus();
        break;
      case KEYS.END:
        !e.ctrlKey && listItems[listItems.length - 1].focus();
        break;
      case KEYS.ARROW_UP:
      case KEYS.ARROW_DOWN:
      case KEYS.ARROW_LEFT:
      case KEYS.ARROW_RIGHT:
        arrowNavigation(key, listItems, direction);
        break;
    }
    e.stopPropagation();
  };

  return (
    <StyledList
      as={as}
      ref={containerRef}
      aria-orientation={direction === 'row' ? 'horizontal' : 'vertical'}
      direction={direction}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
    </StyledList>
  );
}

List.defaultProps = {
  as: 'ul',
  direction: 'row',
};

const StyledList = styled.ul<ListProps>`
  display: flex;
  flex-direction: ${({ direction }): string => (direction === 'row' ? 'row' : 'column')};
`;
