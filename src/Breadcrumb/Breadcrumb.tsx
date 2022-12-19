import React from "react";
import styled from "styled-components";
/**
 * type
 */
interface BreadcrumbSplitter {
  splitter?: string;
}
interface PatialPath {
  href: string;
  map?: { [key: string]: string };
  src: string;
  current?: boolean;
}
interface BreadCrumb {
  src?: string;
  root?: string;
  map?: { [key: string]: string };
  width?: string;
  splitter?: string;
}
/**
 * style
 */
export const StyledBreadcrumb = styled.nav<BreadcrumbSplitter>`
  padding: 0.8em 1em;
  border: 1px solid hsl(0deg 0% 90%);
  border-radius: 4px;
  background: hsl(300deg 14% 97%);
  & ol {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }
  & li {
    display: inline;
  }
  & li + li::before {
    margin: 0 0.25em;
    content: ${(props) => `'${props.splitter || '/'}'`};
  }
  & [aria-current='page'] {
    color: #000;
    font-weight: 700;
    text-decoration: none;
  }
`;
function PatialPath({ map, src, href, current }: PatialPath) {
  if (map && map[src] === '') return null;

  return (
    <li>
      {current ? (
        <a href={href} aria-current="page">
          {map ? map[src] ?? map[href] : src}
        </a>
      ) : (
        <a href={href}>{map ? map[src] ?? map[href] : src}</a>
      )}
    </li>
  );
}
export function Breadcrumb({ ...props }: BreadCrumb) {
  const src = props.src ? new URL(props.src) : window.location;
  let root = props.root ?? src.origin;
  const BreadcrumbArray = src.href.replace(root, '').split('/');
  return (
    <StyledBreadcrumb
      splitter={props.splitter}
      aria-label="Breadcrumb"
      style={{ width: props.width }}
    >
      <ol>
        <PatialPath {...props} src={root} href={root} />
        {BreadcrumbArray.map((path, idx) => {
          if (path.trim() !== '') {
            root += '/' + path;
            return (
              <PatialPath
                {...props}
                src={path}
                key={idx}
                href={root}
                current={idx === BreadcrumbArray.length - 1}
              />
            );
          } else null;
        })}
      </ol>
    </StyledBreadcrumb>
  );
}

Breadcrumb.defaultProps = {
  width: 'fit-content',
  splitter: '/',
};
