import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false);
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

            //update state
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

    //so that state isn't updated when the component has unmounted
    useEffect(() => {
        return () => setIsCanceled(true);
    }, []);

    return { logout, error, isPending };
};
