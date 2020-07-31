import React from "react";
import ReactDOM from "react-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";

import { Home } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-hpsr22g5.auth0.com"
      clientId="SDqfve6kCHGUh2KjRVBx1g2vLlE0xeLP"
      redirectUri={window.location.origin}
      audience="https://nfl321.com"
      scope="read:all"
    >
      <Router>
        <Routes>
          <ProtectedRoute path="/" element={() => <Home />} />
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
