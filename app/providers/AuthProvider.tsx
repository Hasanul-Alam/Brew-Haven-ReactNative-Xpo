import { createContext, useEffect, useState, ReactNode } from "react";
import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

// Define User type
interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | {};
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  setUser: (user: User | {}) => void;
  error: string;
  setError: (error: string) => void;
}

const auth = getAuth(app);

export const AuthContext = createContext<AuthContextType>({
  user: {},
  login: async () => {
    return Promise.reject("login function not implemented");
  },
  signup: async () => {
    return Promise.reject("signup function not implemented");
  },
  logout: async () => {
    return Promise.resolve();
  },
  setUser: () => {},
  error: "",
  setError: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // User State
  const [user, setUser] = useState({});
  // Error State
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({});
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password); // Return UserCredential
  };

  const signup = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // console.log({ user, login, signup, logout, setUser, error, setError });

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, setUser, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;