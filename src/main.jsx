import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Test } from './components/Test';

const container = document.getElementById('root');
const root = createRoot(container);

// console.log(Test);

root.render(
  <StrictMode>
    <Test />
  </StrictMode>
);
