import React from 'react';
import styled from '@emotion/styled';

interface ListItemProps extends PropsWithHTMLAttr<HTMLLIElement> {
  [key: string]: unknown;
}

export function ListItem(props: PropsWithHTMLAttr<HTMLLIElement>) {
  return <Li {...props} />;
}

const Li = styled.li<ListItemProps>``;
