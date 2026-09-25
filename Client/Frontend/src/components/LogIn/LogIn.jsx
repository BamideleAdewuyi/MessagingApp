import styles from "./LogIn.module.css"
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router";
import Error from "../Error/Error";

function LogIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className={styles.logInContainer}>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn