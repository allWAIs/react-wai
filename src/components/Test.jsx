import { List, ListItem } from './';

export function Test() {
  return (
    <>
      <List
        test={`
        width: 500px;
        height: 500px;
        background: red;
      `}
      >
        <ListItem style={{ color: 'red' }}>test1</ListItem>
        <ListItem>test2</ListItem>
        <ListItem>test3</ListItem>
        <ListItem>test4</ListItem>
        <ListItem>test5</ListItem>
      </List>
      <List
        direction="col"
        test={`
        width: 500px;
        height: 500px;
        background: red;
      `}
      >
        <ListItem style={{ color: 'red' }}>test1</ListItem>
        <ListItem>test2</ListItem>
        <ListItem>test3</ListItem>
        <ListItem>test4</ListItem>
        <ListItem>test5</ListItem>
      </List>
    </>
  );
}
