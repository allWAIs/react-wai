import React from 'react';
import { KeyboardEvent, MouseEvent } from 'react';
import styled from '@emotion/styled';

interface LinkProps {
  as?: 'img';
  alt?: string;
  src?: string;
  href: string;
  children?: React.ReactNode;
}

function goToLink(event: KeyboardEvent | MouseEvent, url: string) {
  if (
    (event as unknown as KeyboardEvent)['key'] !== 'Enter' &&
    event.type !== 'click'
  )
    return;

  window.location.href = url;

  event.preventDefault();
  event.stopPropagation();
}

const StyledLinkSpan = styled.span`
  :hover,
  :focus,
  :hover::before,
  :focus::before {
    color: #000;
    cursor: pointer;
    outline: 0.2em solid hsl(219deg 63% 44%);
    outline-offset: 0.2em;
  }
  color: #009;
  background: transparent;
  text-decoration: underline;
`;

const StyledLinkImg = styled.img`
  :hover,
  :focus,
  :hover::before,
  :focus::before {
    color: #000;
    cursor: pointer;
    outline: 0.2em solid hsl(219deg 63% 44%);
    outline-offset: 0.2em;
  }
  color: #009;
  background: transparent;
  text-decoration: underline;
`;

export function A11yLink({
  as,
  alt,
  src,
  children,
  href,
  ...restProps
}: LinkProps) {
  const handleLinkClick = (e: KeyboardEvent | MouseEvent, url: string) =>
    goToLink(e, url);

  return (
    <>
      {as === 'img' ? (
        <StyledLinkImg
          tabIndex={0}
          role="link"
          onClick={(e) => handleLinkClick(e, href)}
          onKeyDown={(e) => handleLinkClick(e, href)}
          src={src}
          alt={alt}
          {...restProps}
        />
      ) : (
        <StyledLinkSpan
          tabIndex={0}
          role="link"
          onClick={(e) => handleLinkClick(e, href)}
          onKeyDown={(e) => handleLinkClick(e, href)}
          {...restProps}
        >
          {children}
        </StyledLinkSpan>
      )}
    </>
  );
}

A11yLink.defaultProps = {
  as: 'span',
};
