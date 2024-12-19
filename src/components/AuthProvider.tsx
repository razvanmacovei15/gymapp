import React, { useEffect } from "react";
import axios from "axios";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "./types/User";
import { set } from "zod";

type AuthContext = {
  authState: {
    authToken?: string | null;
    currentUser?: User | null;
  };
  handleLogin?: (email: string, password: string) => Promise<any>;
  handleLogout: () => Promise<any>;
  handleRegister: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
  fetchProfilePhoto: () => Promise<any>;
  profilePhoto: string;
};

const TOKEN_KEY = "authToken";
export const API_URL = "http://maco-coding.go.ro:8010";

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [authState, setAuthState] = useState<{
    authToken: string | null;
    currentUser: User | null;
  }>({
    authToken: localStorage.getItem(TOKEN_KEY),
    currentUser: null,
  });

  async function fetchProfilePhoto() {
    try {
      const result = await axios.get(`${API_URL}/minio/generate-url`);

      setProfilePhoto(result.data);

      return result.data; // Return the updated URL
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  }

  async function handleLogin(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      setAuthState({
        authToken: result.data.token,
        currentUser: result.data.user,
      });

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
    profilePhoto,
    fetchProfilePhoto,
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token and get user details
          const response = await axios.get(`${API_URL}/auth/me`);

          // Set user state
          setAuthState({
            authToken: token,
            currentUser: response.data.user,
          });
        } catch (error: any) {
          console.error("Token verification failed:", error.response || error);
          handleLogout(); // Clear invalid token and user state
        }
      } else {
        console.log("No token found in localStorage");
      }
    };

    initializeAuth();
  }, []);

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
