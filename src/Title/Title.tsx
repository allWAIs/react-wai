import React from 'react';
import styled from 'styled-components';
import { A11yHidden } from '../A11yHidden';

export interface ITitleProps {
  as?: string;
  lv?: string;
  hidden?: boolean;
  focusable?: boolean;
  children?: string;
  forwardedAs?: string | React.ComponentType<any>;
}

export function Title({ lv, hidden, focusable, children, ...restProps }: ITitleProps) {
  const componentName = `h${lv}`;

  return hidden ? (
    <A11yHidden as={componentName} focusable={focusable} {...restProps}>
      {children}
    </A11yHidden>
  ) : (
    <StyledHeading as={componentName} tabIndex={focusable ? 0 : -1} {...restProps}>
      {children}
    </StyledHeading>
  );
}

Title.defaultProps = {
  lv: '2',
  hidden: false,
  focusable: false,
};

const StyledHeading = styled.h2``;
