import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <React.StrictMode>
      <App greeting="Hello" />
    </React.StrictMode>
  );
});
