import React, { createElement as h, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Test } from './components/index';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Test />
  </StrictMode>
);
