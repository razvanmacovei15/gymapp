import React from "react";
import axios from "axios";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthContext = {
  authState: { authToken?: string | null; currentUser?: User | null };
  handleLogin?: (email: string, password: string) => Promise<any>;
  handleLogout: () => Promise<any>;
  handleRegister: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
};

const TOKEN_KEY = "authToken";
export const API_URL = "http://maco-coding.go.ro:8010";

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<{
    authToken: string | null;
    currentUser: User | null;
  }>({
    authToken: localStorage.getItem(TOKEN_KEY),
    currentUser: null,
  });

  async function handleLogin(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log(result);

      setAuthState({
        authToken: result.data.token,
        currentUser: result.data.user,
      });

      console.log(authState.currentUser?.role);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      localStorage.setItem(TOKEN_KEY, result.data.token);

      return result;
    } catch (error) {
      console.error(error);

      const errorMsg =
        (error as any)?.response.data?.message || "An error occurred";

      return { error: true, message: errorMsg };
    }
  }

  async function handleRegister(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const result = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        role,
      });

      console.log(result);

      if (result.status === 200 || result.status === 201) {
        const loginResult = await handleLogin(email, password);

        if ("error" in loginResult) {
          console.error(
            "Error logging in after registration",
            loginResult.message
          );
          return {
            error: true,
            message: "Error logging in after registration",
          };
        }
        return loginResult;
      }
      return result;
    } catch (error) {
      console.error(error);

      const errorMsg =
        (error as any)?.response.data?.message || "An error occurred";

      return { error: true, message: errorMsg };
    }
  }

  async function handleLogout() {
    setAuthState({
      authToken: null,
      currentUser: null,
    });

    localStorage.removeItem(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";
  }

  const contextValue = {
    authState,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
