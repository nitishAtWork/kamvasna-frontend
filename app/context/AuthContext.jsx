"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authApi } from "@/app/lib/auth";
import {
  setAccessToken,
  clearAccessToken,
} from "@/app/lib/token";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated =
    Boolean(user);

  async function initializeAuth() {
    try {
      /*
       * The refresh token is in the
       * HTTP-only cookie.
       */
      const response =
        await authApi.refresh();

      const token =
        response.data?.accessToken;

      if (!token) {
        throw new Error(
          "No access token."
        );
      }

      setAccessToken(token);

      const userResponse =
        await authApi.me();

      const currentUser =
        userResponse.data?.user ||
        userResponse.data;

      setUser(
        currentUser || null
      );
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    const response =
      await authApi.login(
        credentials
      );

    const token =
      response.data?.accessToken;

    if (!token) {
      throw new Error(
        "Login succeeded but no access token was returned."
      );
    }

    setAccessToken(token);

    let currentUser =
      response.data?.user;

    if (!currentUser) {
      const userResponse =
        await authApi.me();

      currentUser =
        userResponse.data?.user ||
        userResponse.data;
    }

    setUser(currentUser);

    return response;
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}