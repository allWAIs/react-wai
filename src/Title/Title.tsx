import React, { ElementType } from 'react';
import styled from '@emotion/styled';
import { A11yHidden } from '../A11yHidden';

export interface TitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  lv?: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
  hidden?: boolean;
  focusable?: boolean;
  children?: string;
  restProps?: unknown[];
  as?: (ElementType<any> & string) | undefined;
  forwardedAs?: string | React.ComponentType<any>;
}

export function Title({
  lv = 2,
  hidden,
  focusable,
  children,
  ...restProps
}: TitleProps) {
  const componentName: `h${typeof lv}` = `h${lv}`;

  return hidden ? (
    <A11yHidden as={componentName} focusable={focusable} {...restProps}>
      {children}
    </A11yHidden>
  ) : (
    <StyledHeading
      as={componentName}
      tabIndex={focusable ? 0 : -1}
      {...restProps}
    >
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
