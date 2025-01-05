import React, {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import axios from "axios";
import { User } from "./types/User";

const TOKEN_KEY = "authToken";
export const API_URL = "http://maco-coding.go.ro:8010";

type AuthContextType = {
  authState: {
    authToken?: string | null;
    currentUser?: User | null;
  };
  handleLogin: (email: string, password: string) => Promise<any>;
  handleLogout: () => void;
  handleRegister: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
  fetchProfilePhoto: () => Promise<void>;
  profilePhoto: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [authState, setAuthState] = useState<{
    authToken: string | null;
    currentUser: User | null;
  }>({
    authToken: localStorage.getItem(TOKEN_KEY),
    currentUser: localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser") as string)
      : null,
  });

  console.log("ce pizda matii ai de nu mergi...");

  // Fetch Profile Photo
  async function fetchProfilePhoto() {
    try {
      const result = await axios.get(`${API_URL}/minio/generate-url`);
      setProfilePhoto(result.data);
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  }

  // Handle Login
  async function handleLogin(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Login successful:", result.data);

      setAuthState({
        authToken: result.data.token,
        currentUser: result.data.user,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      localStorage.setItem(TOKEN_KEY, result.data.token);
      localStorage.setItem("currentUser", JSON.stringify(result.data.user));

      // Fetch profile photo after login
      await fetchProfilePhoto();

      return result;
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: (error as any)?.response?.data?.message || "An error occurred",
      };
    }
  }

  // Handle Logout
  function handleLogout() {
    setAuthState({
      authToken: null,
      currentUser: null,
    });

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("currentUser");
    delete axios.defaults.headers.common["Authorization"];
    setProfilePhoto(""); // Clear the profile photo
  }

  // Handle Register
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
        return handleLogin(email, password);
      }
      return result;
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: (error as any)?.response?.data?.message || "An error occurred",
      };
    }
  }

  // Initialize Auth on Page Load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        handleLogout();
        return;
      }

      console.log("Token found in localStorage:", token);

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/auth/me`);

        setAuthState({
          authToken: token,
          currentUser: response.data.user,
        });

        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        // Fetch profile photo after restoring auth state
        await fetchProfilePhoto();

        console.log("User authenticated:", response.data.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        handleLogout();
      }
    };

    initializeAuth();
  }, []);

  const contextValue = {
    authState,
    handleLogin,
    handleLogout,
    handleRegister,
    profilePhoto,
    fetchProfilePhoto,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// useAuth Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
