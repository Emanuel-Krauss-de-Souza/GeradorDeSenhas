import { useState, useEffect, createContext, ReactNode } from "react";

const TOKEN_KEY = "access-token";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthenticatedProps>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {

    };
    loadToken();
  }, []);

  const register = async ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
