import React, { KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { A11yHidden } from '../A11yHidden';
interface Switch {
  onClick?: () => void;
  a11yHidden?: boolean;
  status?: boolean;
  children?: string | JSX.Element;
  text?: string;
  offText?: string;
  bar?: string | number;
  bg?: string;
  border?: string;
  offBg?: string;
  offBorder?: string;
  delay?: string;
  height?: string;
  ratio?: string;
  offBar?: string;
}

export const StyledSwitch = styled.div`
  width: fit-content;
  &:focus-visible {
    outline: 2px solid #03a9f4;
  }
`;

const Ball = styled.span<Switch>`
  position: absolute;
  top: 1px;
  left: 2px;
  display: inline-block;
  border: 1px solid;
  border-color: ${(props) => props.offBorder};
  border-radius: 100%;
  height: calc(${(props) => props.height} - 4px);
  width: calc(${(props) => props.height} - 4px);
  background: ${(props) => props.offBg};
  transition: all ${(props) => (props.delay || '0.3') + 's'};

  [aria-checked='true'] & {
    transform: translate3d(-100%, 0, 0);
    left: calc(
      -2px + ${(props) => props.height} * ${(props) => Number(props.ratio)}
    );
    background: ${(props) => props.bg};
    border-color: ${(props) => props.border};
  }
`;
const StyledTitle = styled.span`
  margin-right: 10px;
`;
const Bar = styled.span<Switch>`
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  border: 2px solid;
  border-color: ${(props) => props.offBorder};
  border-radius: calc(${(props) => props.height});
  background: ${(props) => props.offBar};
  height: calc(${(props) => props.height});
  width: calc(${(props) => props.height} * ${(props) => Number(props.ratio)});
  [aria-checked='true'] & {
    border-color: ${(props) => props.border};
    background: ${(props) => props.bar};
  }
`;
export const Text = styled.span`
  margin-left: 10px;
`;
export function Switch(props: Switch) {
  const handleKeyUp = ({ key }: KeyboardEvent<HTMLElement>) => {
    if (props.onClick && (key === 'Enter' || key === ' ')) props.onClick();
  };
  return (
    <StyledSwitch
      onClick={props.onClick}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      role="switch"
      aria-checked={props.status}
    >
      {props.a11yHidden ? (
        <>
          <A11yHidden>
            <StyledTitle>{props.children}</StyledTitle>
          </A11yHidden>
          <Bar {...props}>
            <Ball {...props}> </Ball>
          </Bar>
          <A11yHidden>
            <Text>{props.status ? props.text : props.offText}</Text>
          </A11yHidden>
        </>
      ) : (
        <>
          <StyledTitle>{props.children}</StyledTitle>
          <Bar {...props}>
            <Ball {...props}> </Ball>
          </Bar>
          <Text>{props.status ? props.text : props.offText}</Text>
        </>
      )}
    </StyledSwitch>
  );
}
Switch.defaultProps = {
  offText: 'off',
  text: 'on',
  height: '20px',
  bg: 'green',
  border: 'green',
  offBg: 'black',
  ratio: '2',
  bar: 'none',
  offBar: 'none',
  children: 'Switch',
};
