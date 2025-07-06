import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* React strict mode for better debugging */}
    <Provider store={store}> {/* Redux store provider for state management */}
      <App /> {/* Main App component */}
      <Toaster /> {/* Notification system for toasts */}
    </Provider>
  </StrictMode>
);
