import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import styles from "./styles/main.module.scss";

function App() {
    return (
        <div className={styles.App}>
            <header>
                <Navbar />
            </header>
            <main>
                <Signup />
                <Login />
            </main>
        </div>
    );
}

export default App;
