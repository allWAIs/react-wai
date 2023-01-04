import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { A11yLink } from './A11yLink';
import testImage from '../assets/test1.png';

const meta = {
  component: A11yLink,
  title: 'Components/A11yLink',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof A11yLink>;

export default meta;

const image = {
  src: testImage,
  alt: 'testImage',
};

export const Default: ComponentStory<typeof A11yLink> = (args) => (
  <A11yLink href="https://www.naver.com" {...args}>
    www.naver.com
  </A11yLink>
);

export const Image: ComponentStory<typeof A11yLink> = (args) => (
  <A11yLink
    as="img"
    href="https://www.google.com"
    alt={image.alt}
    src={image.src}
    {...args}
  />
);
