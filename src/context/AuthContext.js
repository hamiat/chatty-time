import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

//updates the state
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            //updates global auth state
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        //figure out if user is logged in or not (and show component tree when user is logged in authIsReady = true)
        case "AUTH_IS_READY":
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

    //fires the onAuthStateChanged when page is first loaded
    useEffect(() => {
        //fires every time  there is change in authentication (of user)
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user });
            //fires once
            unsub();
        });
    }, []);

    console.log("AuthContext state:", state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
