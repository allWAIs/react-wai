import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from '../List';
import { useDirection } from './context';

export function TabPanel({ as, direction, ...restProps }) {
  const defaultDirection = useDirection();

  return as === 'ul' || as === 'ol' ? (
    <List
      as={as}
      role="tabpanel"
      direction={direction ?? defaultDirection}
      {...restProps}
    />
  ) : (
    <StyledTabPanel as={as} role="tabpanel" {...restProps} />
  );
}

const StyledTabPanel = styled.div``;

TabPanel.defaultProps = {
  as: StyledTabPanel,
};

TabPanel.propTypes = {
  as: PropTypes.elementType,
  direction: PropTypes.string,
};
