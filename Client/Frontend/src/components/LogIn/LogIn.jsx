import styles from "./LogIn.module.css"
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router";
import Error from "../Error/Error";

function LogIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const {user, setUser} = useOutletContext();

    async function logIn(e) {
        e.preventDefault();
        const logInObj = { username, password };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(logInObj)
        })
        
        const data = await res.json()
        console.log("Parsed server response data");
        if (res.ok && data.user) {
            setUser(data.user);
            localStorage.setItem("token", data.token);
        } else {
            console.log("Login failed. Message: ", data.message);
            setErrors([data.message]);
        }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.logInContainer}>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Log In</button>
            </form>
            {errors.length > 0 && 
            <>
            <ul>
                {errors.map((error, index) => (
                        <li key={index}><Error error={error} /></li>
                    ))}
            </ul>
            </> }
        </div>
    )
}

export default LogIn