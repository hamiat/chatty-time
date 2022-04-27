import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(false);

        //sign user out
        try {
            await projectAuth.signOut();

            //dispatch logout action
            dispatch({ type: "LOGOUT" });

            setIsPending(null);
            setError("Logged out!");
        } catch (err) {
            console.log(err.message);
            setError(null);
            setIsPending(false);
        }
    };
    return { logout, error, isPending };
};
