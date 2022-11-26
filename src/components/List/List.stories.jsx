import { List } from './List';
import { ListItem } from './ListItem';

export default {
  title: 'List',
  component: List,
  args: {
    children: [
      <ListItem key={1}>test1</ListItem>,
      <ListItem key={2}>test2</ListItem>,
      <ListItem key={3}>test3</ListItem>,
      <ListItem key={4}>test4</ListItem>,
      <ListItem key={5}>test5</ListItem>,
    ],
  },
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  direction: 'col',
};

export const Styled = Template.bind({});
Default.args = {
  direction: 'col',
  css: `
    width: 500px;
    height: 500px;
    background-color: #54a1a1;
    & li{
      color: red;
    }
  `,
};
