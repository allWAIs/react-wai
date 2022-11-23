import styled from 'styled-components';

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

export function Alert({ width, height, children }) {
  return (
    <StyledAlert role="alert" style={{ width, height }}>
      {children}
    </StyledAlert>
  );
}
