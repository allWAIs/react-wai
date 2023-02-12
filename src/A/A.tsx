import React from 'react';
import { KeyboardEvent, MouseEvent } from 'react';
import styled from '@emotion/styled';

interface AProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  as?: 'img';
  alt?: string;
  src?: string;
  href?: string;
  children?: React.ReactNode;
  restProps?: unknown[];
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

export function A({ as, alt, src, children, href, ...restProps }: AProps) {
  const handleLinkClick = (e: KeyboardEvent | MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      (e as unknown as KeyboardEvent)['key'] !== 'Enter' &&
      e.type !== 'click'
    ) {
      return;
    }

    window.location.href = url;
  };

  return (
    <>
      {as === 'img' ? (
        <StyledLinkImg
          tabIndex={0}
          role="link"
          onClick={(e) => handleLinkClick(e, href as string)}
          onKeyDown={(e) => handleLinkClick(e, href as string)}
          src={src}
          alt={alt}
          {...restProps}
        />
      ) : (
        <StyledLinkSpan
          tabIndex={0}
          role="link"
          onClick={(e) => handleLinkClick(e, href as string)}
          onKeyDown={(e) => handleLinkClick(e, href as string)}
          {...restProps}
        >
          {children}
        </StyledLinkSpan>
      )}
    </>
  );
}

A.defaultProps = {
  as: 'span',
};
