import React from "react";
import { Carousel } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
};

const Template = () => (
  <Carousel name="carousel-sample" delay={6000}>
    <li style={{ backgroundColor: "#3f2e99", color: "white", padding: "10px" }}>
      <h2>First page</h2>
      Carousel animation delay : 6s
    </li>
    <li style={{ backgroundColor: "#2e6d99", color: "white", padding: "10px" }}>
      <h2>Second page</h2>
      Carousel Name is carousel-sample
    </li>
    <li style={{ backgroundColor: "#2e6d73", color: "white", padding: "10px" }}>
      <h2>Third page</h2>
      Carousel children is carousel html element
    </li>
    <li style={{ backgroundColor: "#f2bcaa", color: "white", padding: "10px" }}>
      <h2>Fourth page</h2>
      Carousel is auto
    </li>
  </Carousel>
);

export const Default = Template.bind({});
