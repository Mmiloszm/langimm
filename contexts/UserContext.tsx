"use client";
import { refreshToken } from "@/lib/api";

import { createContext, useEffect, useState } from "react";

type UserContextType = {
  isAuthenticated: boolean;
  login: ({ refresh, access }: { refresh: string; access: string }) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  useEffect(() => {
    const refreshUserToken = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");
      if (access && refresh) {
        const response = await refreshToken(refresh);
        if (response.access) {
          localStorage.setItem("access", response.access);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } else {
        logout();
      }
    };
    if (!isTokenRefreshed) {
      refreshUserToken();
      setIsTokenRefreshed((prev) => !prev);
    }
  }, [isTokenRefreshed]);

  const login = ({ refresh, access }: { refresh: string; access: string }) => {
    setIsAuthenticated(true);
    setIsTokenRefreshed(true);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("access", access);
  };

  const logout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    setIsAuthenticated(false);
    setIsTokenRefreshed(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
