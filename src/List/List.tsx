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
   * 리스트로 사용할 태그를 결정합니다.
   */
  as: 'ul' | 'ol';
  /**
   * 리스트의 논리적/시각적인 방향과 키보드 네비게이션 방향을 결정합니다.
   * row를 사용하면 좌우방향키,col을 사용하면 상하방향키로 이동합니다.
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
