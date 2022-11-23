import styled from 'styled-components';
import theme from '../utils/theme';
import { Alert } from './Alert/index';
import React, { children, useState } from 'react';
// import addIcon from './../assets/icon/Icon-add.svg'
// import {ReactComponent as CheckIcon} from './../assets/icon/Icon-check.svg'

// console.log(addIcon, CheckIcon);

// const Button = styled.button`
//     color:red;
//     border: 1px solid black;
// `

export function Test() {
  const [alert, setAlert] = useState(false);

  const showAlert = () => {
    setAlert(!alert);
  };

  return (
    <>
      <button className="trigger" onClick={showAlert}>
        example
      </button>
      {alert && (
        <Alert width="300px" height="100px">
          내용을 입력하세요😊
        </Alert>
      )}
      <button>1</button>
    </>
  );
}
