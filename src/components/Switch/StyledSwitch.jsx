import styled from 'styled-components';

export const StyledSwitch = styled.div`
  margin: 2px;
  padding: 4px 4px 8px 8px;
  border-radius: 5px;
  width: max-content;
  user-select: none;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  & .label {
    padding-right: 30px;
  }
  & .label,
  & .on,
  & .off {
    vertical-align: super;
    display: inline-block;
  }
  & .switch {
    position: relative;
    display: inline-block;
    background: ${(props) => props.background};
    border: 1px solid ${(props) => props.background};
    border-radius: 12px;
    height: 20px;
    width: 38px;
    margin-right: 10px;
    & span {
      position: absolute;
      top: 2px;
      left: 2px;
      display: inline-block;
      border-radius: 8px;
      height: 16px;
      width: 16px;
      background: ${(props) => props.circle};
      transition: ${(props) => (props.time || '0.3') + 's all'};
    }
  }

  & .on {
    display: none;
  }
  & .off {
    display: inline;
  }
  &[aria-checked='true'] {
    & .switch span {
      left: 21px;
      background: ${(props) => props.offCircle};
    }
    & .on {
      display: inline;
    }
    & .off {
      display: none;
    }
    & span.switch {
      background-color: ${(props) => props.offBackground};
      border: 1px solid ${(props) => props.offBackground};
    }
  }
  &:focus span.switch,
  &:hover span.switch {
    box-shadow: 0 0 1px 1px #6866e3;
  }
  &:focus,
  &:hover {
    border-width: 2px;
    outline: none;
    cursor: pointer;
  }
`;
