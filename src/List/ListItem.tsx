import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { getFocusableChildren, removeTabbable, restoreTabbable } from '../utils';

export interface ListItemProps extends PropsWithHTMLAttr<HTMLLIElement> {
  children: React.ReactNode;
  [key: string]: unknown;
}

export function ListItem({ children, ...restProps }: ListItemProps): JSX.Element {
  const containerRef = useRef<HTMLLIElement>(null);

  let $focusableChildren: HTMLElement[] = [];

  useEffect(() => {
    const $container = containerRef.current;
    if ($container) {
      $focusableChildren = getFocusableChildren($container);
    }
  }, [children]);

  // li요소가 포커스를 받으면 자식들에 tab으로 접근 가능하도록 한다
  const handleFocus = (e: React.FocusEvent): void => {
    if (e.target === e.currentTarget) {
      $focusableChildren.forEach(restoreTabbable);
    }
  };

  // li가 포커스를 잃으면 자식들에도 tab으로 접근 불가능하도록 한다
  const handleBlur = (e: React.FocusEvent): void => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      $focusableChildren.forEach(removeTabbable);
    }
  };

  return (
    <Li
      ref={containerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      data-r-wai-component-name="ListItem"
      {...restProps}
    >
      {children}
    </Li>
  );
}

const Li = styled.li<ListItemProps>``;
