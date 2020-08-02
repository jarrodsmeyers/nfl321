import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import BaseProvider from "./contexts/BaseProvider";
import { Home } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <BaseProvider>
      <Router>
        <Routes>
          <ProtectedRoute path="/" element={<Home />} />
        </Routes>
      </Router>
    </BaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
