import React from 'react';
import ReactDOM from 'react-dom/client';
import 'lenis/dist/lenis.css';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);

