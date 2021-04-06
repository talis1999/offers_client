import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </AuthContext.Provider>
  );
};
