/* eslint-disable @typescript-eslint/no-explicit-any */
/* global navigator*/

import { isValidElement, ReactNode, Children, ComponentType } from 'react';

export const isTargetComponent = <T extends ComponentType<any>>(target: ReactNode, CompareComponent: T): boolean => {
  if (!isValidElement(target)) {
    return false;
  }
  return target.type === CompareComponent;
};

export const findChildComponent = <T extends ComponentType<any>>(Component: T, children: ReactNode): ReactNode =>
  Children.toArray(children).find((child) => isTargetComponent(child, Component));

export const enforceChildren = <T extends ComponentType<any>>(Component: T, children: ReactNode): void => {
  const isComponentExist = !!findChildComponent(Component, children);
  if (!isComponentExist) {
    const errorMessage = navigator.languages.includes('ko')
      ? `웹 접근성을 준수하기 위하여 자식 요소로 ${Component.name} 컴포넌트를 필수적으로 가져야합니다.`
      : `Use ${Component.name} component for children to comply with web accessibility guidelines`;
    throw new Error(errorMessage);
  }
};
export const restrictChildren = <T extends ComponentType<any>>(
  allowedComponent: T | T[],
  children: ReactNode
): void => {
  let isValid: boolean;
  let validComponentName: string;

  if (Array.isArray(allowedComponent)) {
    isValid = Children.toArray(children).every((child) =>
      allowedComponent.some((allowed) => isTargetComponent(child, allowed))
    );
    validComponentName = allowedComponent.map((Component) => Component.name).join(', ');
  } else {
    isValid = Children.toArray(children).every((child) => isTargetComponent(child, allowedComponent));
    validComponentName = allowedComponent.name;
  }
  if (!isValid) {
    const errorMessage = navigator.languages.includes('ko')
      ? `웹 접근성을 준수하기 위하여, 허용된 컴포넌트만 children으로 사용할 수 있습니다.
      사용 가능한 컴포넌트: ${validComponentName}`
      : `Only following component is allowed for children to comply with web accessibility guidelines
      allowed components: ${validComponentName}`;
    throw new Error(errorMessage);
  }
};
