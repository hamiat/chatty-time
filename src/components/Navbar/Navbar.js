import styles from "./navbar.module.scss";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
    const { logout } = useLogout();
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
