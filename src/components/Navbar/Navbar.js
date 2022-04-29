import styles from "./navbar.module.scss";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function Navbar() {
    const { logout } = useAuthentication();
    return (
        <>
            <h1>Chatty Time</h1>
            <nav>
                <ul>
                    <li className={styles.links}>
                        <a href="/">Login</a>
                    </li>
                    <li className={styles.links}>
                        <a href="/">Signup</a>
                    </li>
                    <li>
                        <button className={styles.logoutBtn} onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
