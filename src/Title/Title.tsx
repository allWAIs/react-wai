import React, { ElementType } from 'react';
import styled from '@emotion/styled';
import { A11yHidden } from '../A11yHidden';

export interface TitleProps extends PropsWithHTMLAttr<HTMLHeadingElement> {
  lv?: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
  hidden?: boolean;
  focusable?: boolean;
  children: React.ReactNode;
  as?: ElementType<any> & string;
  [key: string]: unknown;
}

export function Title({ lv = 2, hidden, focusable, children, ...restProps }: TitleProps): JSX.Element {
  const componentName: `h${typeof lv}` = `h${lv}`;

  return hidden ? (
    <A11yHidden as={componentName} focusable={focusable} {...restProps}>
      {children}
    </A11yHidden>
  ) : (
    <StyledHeading as={componentName} tabIndex={focusable ? 0 : undefined} {...restProps}>
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
