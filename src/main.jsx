import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/auth/auth.providers';

ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  document.getElementById('root')
);
