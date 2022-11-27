import { List, ListItem } from './';

export function Test() {
  return (
    <>
      <List>
        <ListItem>
          <a href="#">Test1</a>
        </ListItem>
        <ListItem>
          <a href="#">Test2</a>
        </ListItem>
        <ListItem>
          <a href="#">Test3</a>
        </ListItem>
        <ListItem>
          <a href="#">Test4</a>
        </ListItem>
      </List>
      <List direction="col">
        <ListItem>
          <a href="#">Test5</a>
        </ListItem>
        <ListItem>
          <a href="#">Test6</a>
        </ListItem>
        <ListItem>
          <a href="#">Test7</a>
        </ListItem>
        <ListItem>
          <a href="#">Test8</a>
        </ListItem>
      </List>
    </>
  );
}
