import React, { DetailedHTMLProps } from 'react';
import styled from '@emotion/styled';

export interface ButtonProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width?: string;
  height?: string;
  color?: string;
  background?: string;
  children?: string;
}

const StyledButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
`;

export function Button({
  width = '100px',
  height = '30px',
  children,
  color = 'white',
  background = 'hsl(216deg 82% 31%)',
}: ButtonProps): JSX.Element {
  return (
    <StyledButton tabIndex={0} role="button" id="action" style={{ width, height, color, background }}>
      {children}
    </StyledButton>
  );
}
