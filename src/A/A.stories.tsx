import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { A } from './A';
import testImage from '../assets/test1.png';

const meta = {
  component: A,
  title: 'Components/A',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof A>;

export default meta;

const image = {
  src: testImage,
  alt: 'testImage',
};

export const Default: ComponentStory<typeof A> = (args) => (
  <A href="https://www.naver.com" {...args}>
    www.naver.com
  </A>
);

export const Image: ComponentStory<typeof A> = (args) => (
  <A
    as="img"
    href="https://www.google.com"
    alt={image.alt}
    src={image.src}
    {...args}
  />
);
