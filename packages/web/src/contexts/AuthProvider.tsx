import React, { useEffect, useState, createContext } from "react";

import type { User } from "firebase";

import firebase from "../firebase";

interface ContextProps {
  user: User | null;
}

const AuthContext = createContext<Partial<ContextProps>>({});

interface ProviderProps {
  children: React.ReactElement;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState({} as User | null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((changedUser: User | null) => {
      setUser(changedUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
