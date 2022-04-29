import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    //arguments from user input in the form fields
    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            //try to signup user
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

    //so that state isn't updated when the component has unmounted
    useEffect(() => {
        return () => setIsCanceled(true);
    }, []);

    return { error, isPending, signup };
};
