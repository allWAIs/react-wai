import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import styled from "@emotion/styled";
interface PaginationProps {
  /**
   * Control tab button Event
   */
  onClick: () => void;
  /**
   * Control tab current page
   */
  isCurrent: boolean;
}
interface ControlTabProps {
  /**
   * Current Page Index
   */
  currentPage: number;
  /**
   * The number of Carousel tab
   */
  entireCarouselPage: number;
  /**
   * Carousel click Event
   */
  onClick: (to: number) => void;
  /**
   * Carousel keyboard Event
   */
  keyEvent: Dispatch<SetStateAction<{ prev: number; current: number }>>;
}
interface NavigationProps {
  /**
   * Control tab container width
   */
  width: number;
}
const CircleSvg = styled.svg`
  &:hover {
    fill: rgb(31, 31, 31);
  }
`;
function Pagination({ onClick, isCurrent }: PaginationProps) {
  return (
    <CircleSvg
      width="30"
      height="30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      fill={isCurrent ? "rgb(73, 73, 73)" : "rgb(175, 175, 175)"}
    >
      <circle cx="15" cy="15" r="8" />
    </CircleSvg>
  );
}
const Navigation = styled.div<NavigationProps>`
  margin: 10px auto auto auto;
  padding: 0 10px;
  height: 30px;
  border-radius: 5px;
  width: ${({ width }) => width * 30}px;
  background-color: rgb(0 0 0 / 65%);
`;
export function ControlTab({
  entireCarouselPage,
  onClick,
  keyEvent,
  currentPage,
}: ControlTabProps) {
  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === "ArrowLeft")
      keyEvent(({ current }) => ({
        prev: current,
        current:
          current > 0
            ? (current - 1) % entireCarouselPage
            : entireCarouselPage - 1,
      }));
    if (key === "ArrowRight")
      keyEvent(({ current }) => ({
        prev: current,
        current: (current + 1) % entireCarouselPage,
      }));
  };
  return (
    <Navigation width={entireCarouselPage} tabIndex={0} onKeyDown={onKeyDown}>
      {Array.from({ length: entireCarouselPage }).map((_, i) => (
        <Pagination
          key={i}
          onClick={() => onClick(i)}
          isCurrent={i === currentPage}
        />
      ))}
    </Navigation>
  );
}
