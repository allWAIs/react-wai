import { useState, useRef, useEffect, forwardRef } from 'react';
import theme from '../../utils/theme';
import { StyledSwitch } from './StyledSwitch';

const _Switch = forwardRef(({ ...props }, ref) => {
  return (
    <StyledSwitch {...props} ref={ref}>
      {props.children}
    </StyledSwitch>
  );
});
export function Switch({ ...props }) {
  let state = props.state;
  const containerRef = useRef(null);

  function toggleState({ type, key }) {
    if (
      type === 'click' ||
      (type === 'keydown' && (key === 'Enter' || key === ' '))
    ) {
      state = !state;
      containerRef.current.setAttribute('aria-checked', state);
      containerRef.current.focus();
    }
  }

  return (
    <_Switch
      role="switch"
      tabIndex="0"
      aria-checked={String(state)}
      onKeyDown={toggleState}
      onClick={toggleState}
      ref={containerRef}
      {...props}
    >
      <span className="label">{props.children}</span>
      <span className="switch">
        <span />
      </span>
      <span className="on" aria-hidden="true">
        {props.text}
      </span>
      <span className="off" aria-hidden="true">
        {props.offText}
      </span>
    </_Switch>
  );
}

Switch.defaultProps = {
  state: false,
  circle: 'white',
  background: 'blue',
  text: '',
  offText: '',
  offCircle: 'white',
  offBackground: 'red',
};
