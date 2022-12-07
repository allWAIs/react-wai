import React from 'react';
import styled, { css } from 'styled-components';

export interface IA11yHiddenProps {
  as?: string;
  focusable?: boolean;
  children?: string;
  restProps: unknown[];
  forwardedAs?: string | React.ComponentType<any>;
}

const StyledA11yHidden = styled.span<IA11yHiddenProps>`
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

export function A11yHidden({
  as,
  focusable,
  children,
  ...restProps
}: IA11yHiddenProps): JSX.Element {
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
