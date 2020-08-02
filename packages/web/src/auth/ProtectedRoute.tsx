/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import type { ReactElement } from "react";

import { AuthContext } from "../contexts";

interface Props {
  element: ReactElement;
  path: string;
}

const ProtectedRoute = ({ path, element, ...props }: Props) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <Route path={path} element={element} {...props} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
