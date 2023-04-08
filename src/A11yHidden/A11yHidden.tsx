import React, { ElementType } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface A11yHidden {
  as?: (ElementType<any> & string) | undefined;
  focusable?: boolean;
  children: React.ReactNode;
  [key: string]: unknown;
}

const StyledA11yHidden = styled.span<A11yHidden>`
  overflow: hidden;
  position: ${({ as }) => (as === 'caption' ? 'static' : 'absolute')};
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;

  ${({ focusable }) =>
    focusable
      ? css`
          &:focus {
            overflow: initial;
            clip: auto;
            clip-path: unset;
            width: initial;
            height: initial;
            margin: initial;
            border: initial;
            padding: initial;
            white-space: initial;
          }
        `
      : ''}
`;

export function A11yHidden({ as, focusable, children, ...restProps }: A11yHidden): JSX.Element {
  return (
    <StyledA11yHidden as={as} focusable={focusable} {...restProps}>
      {children}
    </StyledA11yHidden>
  );
}

A11yHidden.defaultProps = {
  as: 'span',
  focusable: false,
};
