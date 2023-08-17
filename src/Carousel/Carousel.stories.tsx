import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Carousel, CarouselProps } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: `
        캐러셀(Carousel)은 웹 디자인에서 많이 사용되는 UI 요소 중 하나로, 이미지나 콘텐츠를 순환하며 보여주는 슬라이더(Slider) 형태의 컴포넌트입니다. 
        - 캐러셀의 children을 이용하여 페이지를 구성할 수 있습니다.
        - Navigation에 Focus가 되었을 때 키보드 좌우를 움직여서 캐러셀 페이지를 전환시킬 수 있습니다.
        - Paigination을 누르면 원하는 페이지로 전환시킬 수 있습니다.
        - Stop/Pause 버튼을 누르는 것으로 Carousel animation을 켰다 끌 수 있습니다.
        `,
      },
    },
  },
};
const Template: ComponentStory<typeof Carousel> = (
  args: CarouselProps
): JSX.Element => <Carousel {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <li
        style={{ backgroundColor: "#3f2e99", color: "white", padding: "10px" }}
      >
        <h2>First page</h2>
        Carousel animation delay : 6s
      </li>
      <li
        style={{ backgroundColor: "#2e6d99", color: "white", padding: "10px" }}
      >
        <h2>Second page</h2>
        Carousel Name is carousel-sample
      </li>
      <li
        style={{ backgroundColor: "#2e6d73", color: "white", padding: "10px" }}
      >
        <h2>Third page</h2>
        Carousel children is carousel html element
      </li>
      <li
        style={{ backgroundColor: "#f2bcaa", color: "white", padding: "10px" }}
      >
        <h2>Fourth page</h2>
        Carousel is auto
      </li>
    </>
  ),
  name: "carousel-sample",
  delay: 6000,
  height: "500px",
};
