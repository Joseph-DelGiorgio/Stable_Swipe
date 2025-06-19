import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for user state
export type UserProfile = {
  name: string;
  age: number;
  gender: string;
  bio: string;
  imageUri: string;
};

export type Match = {
  id: string;
  name: string;
};

export type UserContextType = {
  address: string | null;
  setAddress: (address: string | null) => void;
  usdcBalance: string;
  setUsdcBalance: (balance: string) => void;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>("0.00");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  return (
    <UserContext.Provider
      value={{ address, setAddress, usdcBalance, setUsdcBalance, profile, setProfile, matches, setMatches }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}; 