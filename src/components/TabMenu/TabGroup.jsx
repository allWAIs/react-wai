import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab, TabPanel } from '.';

export function TabGroup({ children, ...restProps }) {
  useEffect(() => {
    if (
      !Array.isArray(children) ||
      children[0].type !== Tab ||
      children[1].type !== TabPanel
    ) {
      throw new TypeError(
        `접근성을 지키기 위하여 Tab컴포넌트를 첫번째 자식 컴포넌트로, TapPanel컴포넌트를 두번째 자식 컴포넌트로 가져야 합니다. 나머지 Children은 무시됩니다`
      );
    }
  }, []);

  return (
    <StyledTabGroup {...restProps}>{[children[0], children[1]]}</StyledTabGroup>
  );
}

TabGroup.propTypes = {
  children: PropTypes.node,
};

const StyledTabGroup = styled.div``;
