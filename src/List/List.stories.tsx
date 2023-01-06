/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List, ListProps } from './List';
import { ListItem } from './ListItem';

export default {
  title: 'List',
  component: List,
  args: {
    as: 'ul',
    direction: 'row',
    children: [1, 2, 3, 4, 5].map((key) => (
      <ListItem key={key}>
        <a href="#">ListItem {key}</a>
      </ListItem>
    )),
  },
  parameters: {
    docs: {
      description: {
        component: `
        키보드 네비게이션을 지원하는 리스트 컴포넌트입니다.
        - direction prop에 따라 좌우 또는 위아래 방향키로 이동할 수 있습니다.
        - Home/End 키로 리스트의 맨 처음과 마지막 아이템으로 이동할 수 있습니다.
        `,
      },
    },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args: ListProps) => (
  <List {...args} />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'col',
  'data-id': '123',
};

export const RowList = Template.bind({});
RowList.parameters = {
  docs: {
    description: {
      story: '순서가 없는 리스트 - 가로 방향',
    },
  },
};

export const ColumnList = Template.bind({});
ColumnList.args = {
  as: 'ol',
  direction: 'col',
};
ColumnList.parameters = {
  docs: {
    description: {
      story: '순서가 있는 리스트 - 세로 방향',
    },
  },
};

export const StyledList = Template.bind({});
StyledList.args = {
  direction: 'col',
  children: ['red', 'yellow', 'coral', 'green', 'pink'].map((key) => (
    <ListItem key={key} style={{ height: '100px', background: key }}>
      <a href="#">ListItem {key}</a>
    </ListItem>
  )),
};
StyledList.parameters = {
  docs: {
    description: {
      story: '스타일을 적용한 리스트 - 세로 방향',
    },
  },
};
