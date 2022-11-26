/* eslint-disable jsx-a11y/tabindex-no-positive */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { A11yHidden } from '../index';

export function Title({ lv, hidden, focusable, children, ...restProps }) {
  const componentName = `h${lv}`;

  return hidden ? (
    <A11yHidden as={componentName} focusable={focusable} {...restProps}>
      {children}
    </A11yHidden>
  ) : (
    <StyledHeading
      as={componentName}
      tabIndex={focusable ? 0 : -1}
      {...restProps}
    >
      {children}
    </StyledHeading>
  );
}

Title.defaultProps = {
  lv: '2',
  hidden: false,
  focusable: false,
};

const { oneOf, bool, node } = PropTypes;

Title.propTypes = {
  lv: oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
  hidden: bool,
  focusable: bool,
  children: node.isRequired,
};

const StyledHeading = styled.h2``;
