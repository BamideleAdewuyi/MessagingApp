import styles from "./CreateAccount.module.css"
import Error from "../Error/Error"
import { useState } from "react"
import { useNavigate } from "react-router"

function CreateAccount() {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function addUser(e) {
        e.preventDefault();
        const userObj = { username, password, confirmPassword };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/user/new`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userObj)
        })
        if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();

        if (data.msg) {
            alert(data.msg);
            navigate('/login');
        } else {
            setErrors(data.errors.map((error) => error.msg));
        }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.createAccountContainer}>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" />
                <button type="submit">Create Account</button>
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

export default CreateAccount