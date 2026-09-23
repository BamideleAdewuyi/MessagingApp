import styles from "./LogIn.module.css"

function LogIn() {
    return(
        <div className={styles.logInContainer}>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn