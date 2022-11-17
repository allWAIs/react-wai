import styled from 'styled-components';
import { goToLink } from '../../utils';

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

export function Link({ as, alt, src, href, children }) {
  return (
    <>
      {as === 'img' ? (
        <StyledLinkImg
          tabIndex="0"
          role="link"
          onClick={(e) => goToLink(e, href)}
          onKeyDown={(e) => goToLink(e, href)}
          src={src}
          alt={alt}
        />
      ) : (
        <StyledLinkSpan
          tabIndex="0"
          role="link"
          onClick={(e) => goToLink(e, href)}
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
