import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from /client
import App from './App.js';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
