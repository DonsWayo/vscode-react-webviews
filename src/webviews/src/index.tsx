import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import View1 from './View1';
import View2 from './View2';
import VSCodeAPI from './lib/VSCodeAPI';
import './lib/vscode.css';

// Initialize VSCode API once
VSCodeAPI;

// Get initial route from root element
const root = document.getElementById('root');
const initialRoute = root?.getAttribute('data-route') || 'view1';

// Main App component with routing
const App: React.FC = () => {
  return (
    <MemoryRouter initialEntries={[`/${initialRoute}`]} initialIndex={0}>
      <Routes>
        <Route path="/view1" element={<View1 />} />
        <Route path="/view2" element={<View2 />} />
        <Route path="*" element={<Navigate to={`/${initialRoute}`} replace />} />
      </Routes>
    </MemoryRouter>
  );
};

// Render the app
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
