import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
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

            setIsPending(false);
            setError("Success!");
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return { error, isPending, signup };
};
