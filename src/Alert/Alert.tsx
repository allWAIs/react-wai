import React, { DetailedHTMLProps } from 'react';
import styled from '@emotion/styled';

export interface AlertProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  width?: string;
  height?: string;
  color?: string;
  bg?: string;
  children?: string;
}

const StyledAlert = styled.div<AlertProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  &:empty {
    display: none;
  }
`;

export function Alert({
  width,
  height,
  children,
  color = 'black',
  bg = 'hsl(200deg 20% 90%)',
}: AlertProps): JSX.Element {
  return (
    <StyledAlert
      role="alert"
      style={{ width, height, color: color, background: bg }}
    >
      {children}
    </StyledAlert>
  );
}
