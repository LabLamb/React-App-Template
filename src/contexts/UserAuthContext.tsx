import { createContext } from "react";
import { Constants } from "../Constants";
import { useLocalStorage } from "../hooks/UseLocalStorage";

export type UserData = {
  id: string;
  name: string;
  email: string;
};

const contextValues: UserContextType = {
  isUserLoggedIn: false,
  setUserData: () => {},
  logout: () => {},
};

export type UserContextType = {
  isUserLoggedIn: boolean;
  userData?: UserData;
  setUserData: (userData: UserData) => void;
  logout: () => void;
};

export const UserAuthContext = createContext<UserContextType>(contextValues);

export const UserAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessionValue, setSessionValue] = useLocalStorage<UserData | undefined>(
    Constants.localStorageKeys.userData,
    undefined
  );

  return (
    <UserAuthContext.Provider
      value={{
        isUserLoggedIn: (() => !!sessionValue)(),
        setUserData: (userData: UserData) => setSessionValue(userData),
        logout: () => {
          setSessionValue(undefined);
        },
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
