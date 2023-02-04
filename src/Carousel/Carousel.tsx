import React from 'react';
import styled from '@emotion/styled';

const CarouselContainer = styled.section`
  max-width: 900px;
`;
function CarouselController() {
  return <button>Stop/Play</button>;
}

export function Carousel(name: string) {
  return (
    <CarouselContainer aria-label={name}>
      <CarouselController></CarouselController>
    </CarouselContainer>
  );
}
