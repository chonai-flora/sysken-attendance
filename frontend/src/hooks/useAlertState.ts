import { useContext } from "react";

import { AlertStateContext } from "../contexts/AlertStateContext";

export const useAlertState = () => {
    const context = useContext(AlertStateContext);
    if (!context) {
        throw new Error("`useAlertState` must be used within a `AlertStateProvider`");
    }
    
    return context;
};