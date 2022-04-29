import styles from "./navbar.module.scss";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Navbar() {
    const { logout } = useAuthentication();
    const { user } = useAuthContext();

    return (
        <>
            <h1>Chatty Time</h1>
            <nav>
                <ul>
                    {!user && (
                        <>
                            <li className={styles.links}>
                                <a href="/">Login</a>
                            </li>
                            <li className={styles.links}>
                                <a href="/">Signup</a>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li className={styles.helloUser}>
                                Hello {user.displayName}
                            </li>
                            <li>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}
