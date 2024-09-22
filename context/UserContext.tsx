"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext<string | null>("");

// Create a custom hook to use the context
export const useUser = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
