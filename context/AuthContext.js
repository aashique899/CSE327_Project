import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  createUser,
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../lib/appwrite/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentAccount = await getCurrentUser();
        if (currentAccount) {
          setUser(currentAccount);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking session:", error.message);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const session = await loginUser(email, password);
      if (session) {
        const currentAccount = await getCurrentUser();
        setUser(currentAccount);
        setIsLoggedIn(true);
        return currentAccount;
      } else {
        return null;
      }
    } catch (error) {
      Alert.alert("Login Error", error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setIsLoading(true);
      const session = await createUser(email, password, name);
      if (session) {
        const currentAccount = await getCurrentUser();
        setUser(currentAccount);
        setIsLoggedIn(true);
        return currentAccount;
      } else {
        return null;
      }
    } catch (error) {
      Alert.alert("Signup Error", error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
