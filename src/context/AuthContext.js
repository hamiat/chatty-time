import { createContext, useReducer } from "react";

export const AuthContext = createContext();

//updates the state
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            //updates global auth state
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        //figure out if user is logged in or not
        case "Auth_IS_READY":
            return { ...state, user: action.payload, authIsReady: true };
        default:
            return state;
    }
};

//wraps the AuthContextProvider component below
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    });
    console.log("AuthContext state:", state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
