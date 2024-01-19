import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AuthContext } from './contexts/auth/auth.context';
import { AuthenticatedRoutes } from './routes/authenticated';
import { NotAuthenticatedRoutes } from './routes/not-authenticated';
import "./App.css";

const App = () => {


  window.addEventListener('load', () => {
    const skipBrowserWarningHeader = document.createElement('meta');
    skipBrowserWarningHeader.name = 'skip-browser-warning-header';
    skipBrowserWarningHeader.content = 'true';
    document.head.appendChild(skipBrowserWarningHeader);
  });

  const { authState } = useContext(AuthContext);

  let Routes = NotAuthenticatedRoutes;

  // let Routes = AuthenticatedRoutes;


  switch(authState.isAuthenticated) {
    case true:
      Routes = AuthenticatedRoutes;
  }

  return (
    <div className="App">
      <BrowserRouter>
      { authState.isAuthenticated && <Sidebar />}
        {/* <Sidebar /> */}
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
