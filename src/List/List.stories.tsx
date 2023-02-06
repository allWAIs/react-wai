/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List, ListProps } from './List';
import { ListItem } from './ListItem';
import { Title } from '../Title';

export default {
  title: 'List',
  component: List,
  args: {
    as: 'ul',
    style: { listStyle: 'none', gap: '10px' },
    direction: 'row',
    children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
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
        - 자식 컴포넌트로 ListItem만을 사용할 수 있으며, ListItem 내부에 List를 중첩하여 사용할 수 있습니다.
        - direction prop을 통해 네비게이션 방향을 결정합니다.(row일 경우 ←→, col일 경우 ↑↓로 이동).
        - Tab키를 통해 계층 간 이동 / 방향키를 통해 계층 내 이동을 지원하며, 특수키를 통한 이동 또한 가능합니다.
    키 설명
      - Tab: 다음 계층으로 포커스 이동. 현재 포커스된 요소가 컴포넌트의 마지막 계층일 경우 컴포넌트 바깥으로 탈출
      - Shift+Tab: 이전 계층으로 포커스 이동. 현재 포커스된 요소가 컴포넌트의 처음 계층일 경우 컴포넌트 바깥으로 탈출
      - ↑/←: 계층 내 이전 요소로 포커스 이동. 현재 포커스된 요소가 계층 내 처음 요소일 경우 이동하지 않음.
      - ↓/→: 계층 내 다음 요소로 포커스 이동. 현재 포커스된 요소가 계층 내 마지막 요소일 경우 이동하지 않음.
      - Home(macOS의 경우 ⌘+↑/←): 계층 내 첫번째 요소로 포커스 이동
      - End(macOS의 경우 ⌘+↓/→): 계층 내 마지막 요소로 포커스 이동
      - Ctrl+Home: 컴포넌트 내 첫번째 요소로 포커스 이동
      - Ctrl+End: 컴포넌트 내 마지막 요소로 포커스 이동
      - PageUp(macOS의 경우 ⌥+↑/←): 계층 내 지정한 개수만큼 이전 요소로 이동
      - PageDown(macOS의 경우 ⌥+↓/→): 계층 내 지정한 개수만큼 다음 요소로 이동
        `,
      },
    },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args: ListProps) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  direction: 'col',
  'data-id': '123',
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

const webtoonData = [
  {
    day: '월요웹툰',
    webtoons: ['월요웹툰1', '월요웹툰2', '월요웹툰3'],
  },
  {
    day: '화요웹툰',
    webtoons: ['화요웹툰1', '화요웹툰2', '화요웹툰3'],
  },
  {
    day: '수요웹툰',
    webtoons: ['수요웹툰1', '수요웹툰2', '수요웹툰3'],
  },
  {
    day: '목요웹툰',
    webtoons: ['목요웹툰1', '목요웹툰2', '목요웹툰3'],
  },
  {
    day: '금요웹툰',
    webtoons: ['금요웹툰1', '금요웹툰2', '금요웹툰3'],
  },
  {
    day: '토요웹툰',
    webtoons: ['토요웹툰1', '토요웹툰2', '토요웹툰3'],
  },
  {
    day: '일요웹툰',
    webtoons: ['일요웹툰1', '일요웹툰2', '일요웹툰3'],
  },
];

export const NestedList = Template.bind({});
NestedList.args = {
  direction: 'row',
  children: webtoonData.map(({ day, webtoons }) => (
    <ListItem key={day} style={{ textAlign: 'center', background: 'yellow' }}>
      <Title style={{ width: '100%' }}>{day}</Title>
      <List
        key={day}
        style={{
          listStyle: 'none',
          margin: '0 16px',
          padding: '10px',
          background: 'pink',
          alignItems: 'center',
          gap: '10px',
        }}
        direction="col"
        nested
      >
        {webtoons.map((title) => (
          <ListItem key={title} style={{ width: '100%', height: '100px', textAlign: 'center', background: 'coral' }}>
            <Title lv={3} style={{ width: '100%' }}>
              {title}
            </Title>
            <a href="#">링크1</a>
            <a href="#">링크2</a>
            <a href="#">링크3</a>
          </ListItem>
        ))}
      </List>
    </ListItem>
  )),
};
NestedList.parameters = {
  docs: {
    description: {
      story: '중첩 리스트',
    },
  },
};
