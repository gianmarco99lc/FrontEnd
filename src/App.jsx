import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AuthContext } from './contexts/auth/auth.context';
import { AuthenticatedRoutes } from './routes/authenticated';
import { NotAuthenticatedRoutes } from './routes/not-authenticated';
import "./App.css";

const App = () => {

  const state = useContext(AuthContext);

  let Routes = state.isAuthenticated ? AuthenticatedRoutes : NotAuthenticatedRoutes

  return (
    <div className="App">
      { state.isAuthenticated && <Sidebar />}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
