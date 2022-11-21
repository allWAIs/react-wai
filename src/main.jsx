import React, { createElement as h, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Test, Link } from './components/index';
// import testImg from './assets/img/gitprofile.jpeg';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Link href="https://www.w3.org/WAI/ARIA/apg/example-index/link/link.html">
      allWAIs
    </Link>
    <Link
      as="img"
      alt="test이미지"
      src="./assets/img/gitprofile.jpeg"
      href="https://www.w3.org/WAI/ARIA/apg/example-index/link/link.html"
    />
  </StrictMode>
);
