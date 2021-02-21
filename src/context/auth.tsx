import { DiscordUserType } from "@/types";
import { fetchAuthenticatedUser } from "@utils/access-token";
import React, { createContext, useContext, useState } from "react";
import { useDidMount } from "beautiful-react-hooks";

type StateType = {
  user: DiscordUserType | null;
  setUser: (arg: DiscordUserType | null) => void;
};

const MyContext = createContext<StateType | null>(null);

export const useAuthContext = (): StateType => {
  const value = useContext(MyContext)!;

  if (value === null) throw new Error("Please add SharedStateProvider");

  return value;
};

export const AuthStateProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<DiscordUserType | null>(null);

  useDidMount(async () => {
    const userData = await fetchAuthenticatedUser();
    userData && setUser(userData);
  });

  return <MyContext.Provider value={{ user, setUser }}>{children}</MyContext.Provider>;
};
