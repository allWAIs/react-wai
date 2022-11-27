import { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import {
  getFocusableChildren,
  arrowNavigation,
  KEYS,
  getCompatibleKey,
} from '../../utils';

export function List({ as, direction, children, ...restProps }) {
  const containerRef = useRef(null);

  let listItems = [];

  useEffect(() => {
    const $container = containerRef.current;
    listItems = getFocusableChildren($container);
  }, []);

  const handleKeyDown = (e) => {
    const key = getCompatibleKey(e, direction);

    switch (key) {
      case KEYS.HOME:
      case KEYS.END:
        e.preventDefault();
        if (!e.ctrlKey) {
          key === KEYS.HOME ? listItems[0].focus() : listItems.at(-1).focus();
          e.stopPropagation();
        }
        break;
      case KEYS.ARROW_UP:
      case KEYS.ARROW_DOWN:
      case KEYS.ARROW_LEFT:
      case KEYS.ARROW_RIGHT:
        e.preventDefault();
        arrowNavigation(direction, listItems, key);
        break;
      default:
        break;
    }
  };

  return (
    <StyledList
      as={as}
      ref={containerRef}
      aria-orientation={direction === 'row' ? 'horizontal' : 'vertical'}
      $d={direction}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
    </StyledList>
  );
}

List.defaultProps = {
  as: 'ul',
  direction: 'row',
};
List.propTypes = {
  /**
   리스트 형식
   */
  as: PropTypes.oneOf(['ul', 'ol']),
  /**
   리스트 방향. 해당 값에 따라 방향키 네비게이션이 달라짐
   */
  direction: PropTypes.oneOf(['row', 'col']),
  children: PropTypes.node,
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: ${({ $d }) => ($d === 'row' ? 'row' : 'column')};
  justify-content: ${({ $d }) => ($d === 'row' ? 'space-between' : 'center')};
  align-items: ${({ $d }) => ($d === 'row' ? 'center' : 'space-between')};
`;
