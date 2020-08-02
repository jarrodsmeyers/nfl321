import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import BaseProvider from "./contexts/BaseProvider";
import Home from "./components/Home";
import { SignIn, SignUp } from "./components/auth";

ReactDOM.render(
  <React.StrictMode>
    <BaseProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <ProtectedRoute path="/" element={<Home />} />
        </Routes>
      </Router>
    </BaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
