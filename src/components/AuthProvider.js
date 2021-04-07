import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
};
