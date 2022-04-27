import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

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
            console.log(response.user);

            if (!res) {
                throw new Error("Could not complete signup");
            }

            //add display name to user
            await res.user.updateProfile({ displayName });

            setIsPending(false);
            setError(null);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return { error, isPending, signup };
};