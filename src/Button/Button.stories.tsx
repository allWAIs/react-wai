import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

const meta = {
  component: Button,
  title: 'Components/Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Button>;

export default meta;

export const Default: ComponentStory<typeof Button> = (args) => <Button {...args}>Click Button!</Button>;
