import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = () => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
