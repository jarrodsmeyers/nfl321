/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType } from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface Props {
  element: ComponentType;
  path: string;
}

const ProtectedRoute = ({ element, path, ...args }: Props) => {
  const AuthElement = withAuthenticationRequired(element);

  return <Route path={path} element={<AuthElement />} {...args} />;
};

export default ProtectedRoute;
