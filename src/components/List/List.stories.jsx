/* eslint-disable jsx-a11y/anchor-is-valid */
import { List } from './List';
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
        키보드 네비게이션을 지원하는 리스트 컴포넌트
        - direction prop에 따라 좌우 또는 위아래 방향키로 아이템 탐색
        - Home/End 키로 리스트의 맨 처음과 마지막 아이템으로 이동
        `,
      },
    },
  },
};

const Template = (args) => <List {...args} />;

export const RowList = Template.bind({});

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
