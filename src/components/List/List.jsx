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
    const key = getCompatibleKey(e);

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
        e.stopPropagation();
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
  as: PropTypes.oneOf(['ul', 'ol']),
  direction: PropTypes.oneOf(['row', 'col']),
  children: PropTypes.node,
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: ${({ $d }) => ($d === 'row' ? 'row' : 'column')};
  justify-content: ${({ $d }) => ($d === 'row' ? 'space-between' : 'center')};
  align-items: ${({ $d }) => ($d === 'row' ? 'center' : 'space-between')};
  list-style: none;
`;
