import { Title } from './Title';
// import addIcon from './../assets/icon/Icon-add.svg'
// import {ReactComponent as CheckIcon} from './../assets/icon/Icon-check.svg'

// console.log(addIcon, CheckIcon);

// const Button = styled.button`
//     color:red;
//     border: 1px solid black;
// `

export function Test() {
  return (
    <>
      <Title>기본값</Title>
      <Title lv={1}>헤딩 레벨 1</Title>
      <Title lv={3} focusable={true}>
        헤딩 레벨 3 포커스 가능
      </Title>
      <Title hidden>접근성 숨김을 적용한 헤딩 태그</Title>
    </>
  );
}
