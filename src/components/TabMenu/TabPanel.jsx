import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from '../List';

export function TabPanel({ as, ...restProps }) {
  const ComponentName = as === 'ul' || as === 'ol' ? List : StyledTabPanel;

  return <ComponentName as={as} role="tabpanel" {...restProps} />;
}

const StyledTabPanel = styled.div``;

TabPanel.defaultProps = {
  as: StyledTabPanel,
};

TabPanel.propTypes = {
  as: PropTypes.elementType,
};
