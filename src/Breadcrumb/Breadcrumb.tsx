import React from 'react';
import styled from '@emotion/styled';
/**
 * A splitter is a component that divides a path into two separate paths.
 */
interface BreadcrumbSplitter {
  /**
   * Breadcrumb splitter text
   */
  splitter?: string;
  /**
   * Breadcrumb splitter color
   */
  color?: string;
  /**
   * Breadcrumb splitter background color
   */
  bg?: string;
}
/**
 * The partial path is a representation of a portion of the breadcrumb."
 */
interface PatialPath {
  /**
   * The href of breadcrumb path
   */
  href: string;
  /**
   * Path map determines breadcrumb path name
   */
  map?: { [key: string]: string };
  /**
   * Path address
   */
  src: string;
  /**
   * This path address is current address.
   */
  current?: boolean;
}
interface Breadcrumb extends BreadcrumbSplitter {
  /**
   * The address, as indicated by the breadcrumb
   */
  src?: string;
  /**
   * Sets the initial path address.
   */
  root?: string;
  /**
   * An object that represents the overall name of each path in the breadcrumb.
   */
  map?: { [key: string]: string };
  /**
   * It determines breadcrumb background width
   */
  width?: string;
}

export const StyledBreadcrumb = styled.nav<BreadcrumbSplitter>`
  padding: 0.8em 1em;
  border: 1px solid hsl(0deg 0% 90%);
  border-radius: 4px;
  background: ${(props) => props.bg};
  & ol {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }
  & li {
    display: inline-block;
  }
  & li:not(:last-child)::after {
    margin: 0 0.25em;
    content: ${(props) => `'${props.splitter || '/'}'`};
    color: ${(props) => props.color};
  }
  & a {
    color: ${(props) => props.color};
  }
  & [aria-current='page'] {
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
          {map ? map[src] ?? map[href] ?? src : src}
        </a>
      ) : (
        <a href={href}>{map ? map[src] ?? src : src}</a>
      )}
    </li>
  );
}
/**
 * Breadcrumbs are a navigational aid that allows users to keep track of their current location on a website or interface.
 */
export function Breadcrumb({
  splitter = '/',
  width = 'fit-content',
  color = 'black',
  bg = 'hsl(300deg 14% 97%)',
  ...props
}: Breadcrumb) {
  const src = props.src ? new URL(props.src) : window.location;
  let root = props.root ?? src.origin;
  const BreadcrumbArray = src.href.replace(root, '').split('/');
  return (
    <StyledBreadcrumb
      splitter={splitter}
      aria-label="Breadcrumb"
      style={{ width: width }}
      color={color}
      bg={bg}
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
