import { ReactNode, useState } from "react";
import { AlertStateContext } from "../contexts/AlertStateContext";

export const AlertStateProvider = (props: { children: ReactNode }): JSX.Element => {
    const [alert, setAlert] = useState<JSX.Element | null>(null);

    const value = {
        alert,
        setAlert,
    };

    return (
        <AlertStateContext.Provider value={value}>
            {props.children}
        </AlertStateContext.Provider>
    );
}