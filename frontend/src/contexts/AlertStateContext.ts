import { createContext } from "react";
  
export type AlertState = {
    alert: JSX.Element | null;
    setAlert: (newAlert: JSX.Element | null) => void;
};

export const AlertStateContext = createContext<AlertState>({} as AlertState);