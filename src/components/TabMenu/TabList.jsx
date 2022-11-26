import styled from 'styled-components';
import PropTypes from 'prop-types';

export function TabList({ direction, children, ...restProps }) {
  return (
    <StyledTabList role="tablist" $d={direction} {...restProps}>
      {children}
    </StyledTabList>
  );
}

const { string, node } = PropTypes;
TabList.defaultProps = {
  direction: 'row',
};

TabList.propTypes = {
  direction: string,
  children: node,
};

const StyledTabList = styled.div`
  display: flex;
  flex-direction: ${({ $d }) => ($d === 'row' ? 'row' : 'column')};
`;
