import styled, { css } from 'styled-components';

export function ListItem(props) {
  const customCss = css`
    width: 100px;
    color: red;
  `;
  return <Li css={customCss} {...props} />;
}

const Li = styled.li``;
