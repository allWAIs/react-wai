import React from 'react';

export const findChildComponent = (
  Component: React.ReactElement,
  children: React.ReactNode
) => React.Children.toArray(children).find(({ type }) => type === Component);

export const enforceChildComponent = (
  Component: React.ReactElement,
  children: React.ReactNode
) => {
  const isComponentExist = !!findChildComponent(Component, children);
  if (!isComponentExist) {
    throw new Error(
      `웹 접근성을 준수하기 위하여, 자식 요소로 ${Component.name} 컴포넌트를 필수적으로 가져야합니다.`
    );
  }
};
