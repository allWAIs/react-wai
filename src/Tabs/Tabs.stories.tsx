import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  component: Tabs,
  title: 'Components/Tabs',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Tabs>;

export default meta;

const tabData = [
  { id: 0, title: 'tab1', content: 'tab1 Content' },
  { id: 1, title: 'tab2', content: 'tab2 Content' },
];

export const Default: ComponentStory<typeof Tabs> = (args) => (
  <Tabs className="active" {...args} />
);
