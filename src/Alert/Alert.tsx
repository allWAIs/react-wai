import React from 'react';
import styled from '@emotion/styled';

export interface AlertProps {
  width?: string;
  height?: string;
  children?: string;
}

const StyledAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  background: hsl(200deg 20% 90%);

  &:empty {
    display: none;
  }
`;

export function Alert({ width, height, children }: AlertProps): JSX.Element {
  return (
    <StyledAlert role="alert" style={{ width, height }}>
      {children}
    </StyledAlert>
  );
}
