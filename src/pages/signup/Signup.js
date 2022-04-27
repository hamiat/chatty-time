import styles from "./signup.module.scss";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [displayName, setDisplayName] = useState("");

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
        e.target.value = "";
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            {!isPending && (
                <button className={styles.btn} type="submit">
                    Send
                </button>
            )}
            {isPending && (
                <button className={styles.btn} disabled>
                    loading...
                </button>
            )}
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}
