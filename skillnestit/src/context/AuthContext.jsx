import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    const storedToken = localStorage.getItem("token");
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (data, authToken) => {
    setAuthData(data);
    setToken(authToken);

    localStorage.setItem('authData', JSON.stringify(data));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setAuthData(null);
    setToken(null);

    localStorage.removeItem('authData');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
