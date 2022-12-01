import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';

export function A11yHidden({ as, focusable, ...restProps }) {
  return <StyledA11yHidden as={as} focusable={focusable} {...restProps} />;
}

A11yHidden.defaultProps = {
  as: 'span',
  focusable: false,
};

const { string, elementType, bool, oneOfType } = PropTypes;

A11yHidden.propTypes = {
  as: oneOfType([string, elementType]),
  focusable: bool,
};

const StyledA11yHidden = styled.span`
  overflow: hidden;
  position: ${({ as }) => (as === 'caption' ? 'static' : 'absolute')};
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;

  ${({ focusable }) =>
    focusable
      ? css`
          &:focus {
            overflow: initial;
            clip: auto;
            clip-path: unset;
            width: initial;
            height: initial;
            margin: initial;
            border: initial;
            padding: initial;
            white-space: initial;
          }
        `
      : ''}
`;
