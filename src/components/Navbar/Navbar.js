import styles from "./navbar.module.scss";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
    const { logout } = useLogout;
    return (
        <>
            <h1>Chatty_time</h1>
            <nav>
                <ul>
                    <li>Login</li>
                    <li>Signup</li>
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
