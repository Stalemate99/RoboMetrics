import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { ChildrenProps } from "../types/DefaultProps";

type User = {
  username: string;
};

interface IAuthContext {
  user: User | any | null;
  signin: (data: any) => Promise<void> | void;
  signout: () => Promise<void> | void;
}

const INITIAL_VALUE = {
  user: {},
  signin: () => {
    return;
  },
  signout: () => {
    return;
  },
};

const AuthContext = createContext<IAuthContext>(INITIAL_VALUE);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const signin = async (data: unknown) => {
    setUser(data);
    navigate("/");
  };

  const signout = () => {
    setUser(null);
    navigate("/signin", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
