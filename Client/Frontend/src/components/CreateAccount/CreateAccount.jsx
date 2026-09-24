import styles from "./CreateAccount.module.css"
import Error from "../Error/Error"
import { useState } from "react"

function CreateAccount() {

    const [errors, setErrors] = useState([]);

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