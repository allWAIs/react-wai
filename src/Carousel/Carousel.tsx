import React from 'react';
import styled from '@emotion/styled';

const Container = styled.section`
  max-width: 900px;
`;
const Tab = styled.div``;
function Pages() {
  return <div></div>;
}
function Controller() {
  return (
    <>
      <button>Stop/Play</button>
      <Tab></Tab>
    </>
  );
}

export function Carousel(name: string) {
  return (
    <Container aria-label={name}>
      <Controller />
      <Pages />
    </Container>
  );
}
