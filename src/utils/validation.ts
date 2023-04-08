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
    const errorMessage = navigator?.languages.includes('ko')
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
  let misusedComponent: ReactNode;

  if (Array.isArray(allowedComponent)) {
    isValid = Children.toArray(children).every((child) =>
      allowedComponent.some((allowed) => {
        const isTargetValid = isTargetComponent(child, allowed);
        if (!isTargetValid) {
          misusedComponent = child;
        }
        return isTargetValid;
      })
    );
    validComponentName = allowedComponent.map((Component) => Component.name).join(', ');
  } else {
    isValid = Children.toArray(children).every((child) => {
      const isTargetValid = isTargetComponent(child, allowedComponent);
      if (!isTargetValid) {
        misusedComponent = child;
      }
      return isTargetValid;
    });
    validComponentName = allowedComponent.name;
  }
  if (!isValid) {
    const errorMessage = navigator?.languages.includes('ko')
      ? `웹 접근성을 준수하기 위하여 허용된 컴포넌트만 children으로 사용할 수 있습니다.
      사용 가능한 컴포넌트: ${validComponentName}
      사용된 컴포넌트: ${misusedComponent}`
      : `Only following component is allowed for children to comply with web accessibility guidelines
      allowed components: ${validComponentName}
      misused component: ${misusedComponent}`;
    throw new Error(errorMessage);
  }
};

export const validateElements = (
  children: HTMLElement[],
  callback: (element: HTMLElement) => boolean,
  errorMessage: string
): void => {
  const isValid = children.every(callback);
  if (!isValid) {
    throw new Error(errorMessage);
  }
};

export const restrictElementsByComponetName = (children: HTMLElement[], allowedComponentName: string): void => {
  const errorMessage = navigator?.languages.includes('ko')
    ? `웹 접근성을 준수하기 위하여 자식 요소로 ${allowedComponentName} 컴포넌트만을 가질 수 있습니다.`
    : `Only following component is allowed for children to comply with web accessibility guidelines.
    allowed components: ${allowedComponentName}`;

  validateElements(children, (element) => element.dataset?.rWaiComponentName === allowedComponentName, errorMessage);
};
