import React from "react";

import { AuthProvider } from "./AuthProvider";

interface Props {
  children: React.ReactElement;
}

const BaseProvider = ({ children }: Props) => (
  <AuthProvider>{children}</AuthProvider>
);

export default BaseProvider;
