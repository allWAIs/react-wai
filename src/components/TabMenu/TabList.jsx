import { List } from '../List';
import { useDirection } from './context';

export function TabList(props) {
  const direction = useDirection();

  return <List role="tablist" direction={direction} {...props} />;
}
