import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserData } from "../hooks/UserApiHooks";

interface userContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const UserContext = createContext<userContextType | undefined>(undefined);

type UserProviderProps = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const userData: string | null = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  return context;
};
