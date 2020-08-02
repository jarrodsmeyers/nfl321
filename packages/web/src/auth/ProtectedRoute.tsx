/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Route, useNavigate } from "react-router-dom";

import type { ReactElement } from "react";

import { AuthContext } from "../contexts";

interface Props {
  element: ReactElement;
  path: string;
}

const ProtectedRoute = ({ path, element, ...props }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user?.uid) {
    navigate("/login");
  }

  return <Route path={path} element={element} {...props} />;
};

export default ProtectedRoute;
