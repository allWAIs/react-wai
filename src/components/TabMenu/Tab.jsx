/* eslint-disable jsx-a11y/tabindex-no-positive */
import PropTypes from 'prop-types';
import { useId } from 'react';
import styled from 'styled-components';

export function Tab({ as: componentName, children, ...restProps }) {
  const tabId = useId();

  return (
    <StyledTab
      as={componentName}
      id={`r-wai-tab-${tabId}`}
      role="tab"
      aria-selected="false"
      tabIndex="0"
      focusable="true"
      {...restProps}
    >
      {children}
    </StyledTab>
  );
}

Tab.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

const StyledTab = styled.button``;
