import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  getFocusableChildren,
  arrowNavigation,
  KEYS,
  getCompatibleKey,
} from '../utils';

export interface ListProps
  extends PropsWithHTMLAttr<HTMLUListElement | HTMLOListElement> {
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

export function List({ as, direction, children, ...restProps }: ListProps) {
  const containerRef = useRef(null);

  let listItems: HTMLElement[] = [];

  useEffect(() => {
    const $container = containerRef.current;
    if ($container) {
      listItems = getFocusableChildren($container);
    }
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLUListElement | HTMLOListElement>
  ) => {
    const key = getCompatibleKey(e);

    switch (key) {
      case KEYS.HOME:
      case KEYS.END:
        e.preventDefault();
        if (!e.ctrlKey) {
          key === KEYS.HOME
            ? listItems[0].focus()
            : listItems[listItems.length - 1].focus();
          e.stopPropagation();
        }
        break;
      case KEYS.ARROW_UP:
      case KEYS.ARROW_DOWN:
      case KEYS.ARROW_LEFT:
      case KEYS.ARROW_RIGHT:
        e.preventDefault();
        arrowNavigation(direction, listItems, key);
        e.stopPropagation();
        break;
      default:
        break;
    }
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
  flex-direction: ${({ direction }) =>
    direction === 'row' ? 'row' : 'column'};
`;
