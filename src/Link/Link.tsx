import React from 'react';
import { KeyboardEvent } from 'react';
import styled from '@emotion/styled';

interface LinkProps {
  as?: 'img';
  alt: string;
  src: string;
  href: string;
  children?: React.ReactNode;
}

function goToLink(event: KeyboardEvent | MouseEvent, url: string) {
  if ((event as KeyboardEvent)['key'] !== 'Enter' && event.type !== 'click')
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

export function Link({ as, alt, src, href, children }: LinkProps) {
  return (
    <>
      {as === 'img' ? (
        <StyledLinkImg
          tabIndex={0}
          role="link"
          onClick={(e) => goToLink(e as unknown as MouseEvent, href)}
          onKeyDown={(e) => goToLink(e, href)}
          src={src}
          alt={alt}
        />
      ) : (
        <StyledLinkSpan
          tabIndex={0}
          role="link"
          onClick={(e) => goToLink(e as unknown as MouseEvent, href)}
          onKeyDown={(e) => goToLink(e, href)}
        >
          {children}
        </StyledLinkSpan>
      )}
    </>
  );
}

Link.defaultProps = {
  as: 'span',
};
