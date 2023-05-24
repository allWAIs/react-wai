import React, { useEffect, useState, ReactNode } from 'react';
import styled from '@emotion/styled';
import { ControlTab } from './CarouselTab';

interface CarouselContents extends ContainerProps {
  /**
   * It determines Carousel Page
   */
  children: ReactNode;
  /**
   * The number of Carousel
   */
  entireCarouselPage: number;
  /**
   * Carousel page history including prev page number and current page number
   */
  pageHistory: { prev: number; current: number };
}

interface ContainerProps {
  /**
   * Carousel height
   */
  height?: number | string;
}

export interface CarouselProps {
  /**
   * Carousel aria label
   */
  name: string;
  /**
   * Carousel page slide delay
   */
  delay?: number;
  /**
   * Carousel auto settings
   */
  auto?: boolean;
  /**
   * Carousel Page
   */
  children: JSX.Element[] | JSX.Element;
  /**
   * Carousel height
   */
  height?: number | string;
}
const Container = styled.section<ContainerProps>`
  width: 100%;
  height: ${({ height }) => height ?? '300px'};
  position: relative;
  overflow: hidden;
`;
const ControlButton = styled.button`
  background: rgb(0 0 0 / 65%);
  border: 0;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
`;
const Contents = styled.div<CarouselContents>`
  margin: 0;
  padding: 0;
  width: 100%;
  flex-direction: row;
  & > * {
    width: 100%;
    opacity: 0;
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:focus {
    border: 1px solid blue;
  }

  & > *:nth-of-type(-n + ${({ pageHistory }) => pageHistory.current + 1}) {
    transform: translate3d(-100%, 0, 0);
  }
  & > *:nth-of-type(n + ${({ pageHistory }) => pageHistory.current + 1}) {
    transform: translate3d(100%, 0, 0);
  }
  & > *:nth-of-type(${({ pageHistory }) => pageHistory.prev + 1}) {
    opacity: 1;
  }
  & > *:nth-of-type(${({ pageHistory }) => pageHistory.current + 1}) {
    opacity: 1;
    transform: translate3d(0%, 0, 0);
  }
  & > * {
    height: ${({ height }) => height ?? '300px'};
    transition: 0.2s transform;
  }
`;
const Controller = styled.div`
  position: absolute;
  z-index: 1;
  & button:first-of-type {
    float: left;
  }
  width: 100%;
  text-align: center;
`;

export function Carousel({ name, children, delay, auto = true, height }: CarouselProps) {
  const [pageHistory, setPageHistory] = useState({ prev: 0, current: 0 });
  const [play, setPlay] = useState(!!auto);
  const [pause, setPause] = useState(false);
  const totalPage = Array.isArray(children) ? children.length : children.props.children.length;
  const onClick = (to: number) =>
    setPageHistory(({ current }) => ({
      prev: current,
      current: to % totalPage,
    }));

  useEffect(() => {
    console.log(play, pause);
    if (play && !pause) {
      const timer = setInterval(() => {
        setPageHistory(({ current }) => ({
          prev: current,
          current: (current + 1) % totalPage,
        }));
      }, delay ?? 5000);
      return () => clearInterval(timer);
    }
  }, [play, pause]);
  return (
    <Container aria-roledescription="carousel" aria-label={name} height={height}>
      <Controller>
        <ControlButton
          aria-label={!play ? 'play carousel slide' : 'pause carousel slide'}
          onClick={() => setPlay(!play)}
        >
          {!play ? '▶' : '∥'}
        </ControlButton>
        <ControlTab
          entireCarouselPage={totalPage}
          onClick={onClick}
          keyEvent={setPageHistory}
          currentPage={pageHistory.current}
        />
      </Controller>
      <Contents
        tabIndex={0}
        entireCarouselPage={totalPage}
        pageHistory={pageHistory}
        onFocus={() => setPause(true)}
        onBlur={() => setPause(false)}
        height={height}
      >
        {children}
      </Contents>
    </Container>
  );
}
