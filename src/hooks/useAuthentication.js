import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useAuthentication = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    //Sign function - arguments from user input in the form fields
    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            //try to signup user with projectAuth
            const response = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!response) {
                throw new Error("Could not complete signup");
            }

            //add display name to user
            await response.user.updateProfile({ displayName });

            //dispatch login action - works with authReducer function in useAuthContext
            dispatch({ type: "LOGIN", payload: response.user });

            //update state if clean-up function is not running (false)
            if (!isCanceled) {
                setIsPending(false);
                setError("Success!");
            }
        } catch (err) {
            if (!isCanceled) {
                console.log(err.message);
                setError(null);
                setIsPending(false);
            }
        }
    };

    //Login function
    const login = async (email, password) => {
        setError(null);
        setIsPending(false);

        //sign user in
        try {
            const response = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );

            //dispatch login action
            dispatch({ type: "LOGIN", payload: response.user });
        } catch (err) {
            if (!isCanceled) {
                console.log(err.message);
                setError(null);
                setIsPending(false);
            }

            if (!isCanceled) {
                setIsPending(null);
            }
        }
    };

    //Logout function
    const logout = async () => {
        setError(null);
        setIsPending(false);

        //sign user out
        try {
            await projectAuth.signOut();

            //dispatch logout action
            dispatch({ type: "LOGOUT" });

            if (!isCanceled) {
                setIsPending(null);
                setError("Logged out!");
            }
        } catch (err) {
            if (!isCanceled) {
                console.log(err.message);
                setError(null);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCanceled(true);
    }, []);

    return { error, isPending, signup, login, logout };
};
