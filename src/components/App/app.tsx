import React from "react";
import Header from "../header";
import { AuthContext } from '../context/auth';

import './app.scss';
import useAuth from "../../hook/auth";
import useRoutes from "../routes-app/routes";

const App: React.FC = () => {
  const {token, login, logout, userId, ready, userRoles} = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, email: null, userRoles
    }}>
      <main className="app">
        <div className="container">
          <div className="app__wrapper">
            <Header />

            <div className="app-content">
              {routes}
            </div>
          </div>
        </div>
      </main>
    </AuthContext.Provider>
  );
};

export default App;