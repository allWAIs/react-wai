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
  <Tabs className="active" {...args}>
    <Tabs.Title id="tablist-1" className="">
      테스트용 탭
    </Tabs.Title>
    <Tabs.List role="tablist" aria-labelledby="tablist-1" className="automatic">
      {tabData.map((tab) => (
        <Tabs.List.Item
          key={tab.id}
          id={`tab-${tab.id}`}
          aria-selected="true"
          aria-controls={`tabpanel-${tab.id}`}
        >
          <span className="focus">{tab.title}</span>
        </Tabs.List.Item>
      ))}
    </Tabs.List>
    {tabData.map((tab) => (
      <Tabs.Panel
        key={tab.id}
        id={`tabpanel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
      >
        {tab.content}
      </Tabs.Panel>
    ))}
  </Tabs>
);
