import styles from "./CreateAccount.module.css"

function CreateAccount() {
    return(
        <div className={styles.createAccountContainer}>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="displayName">Display Name</label>
                <input type="text" name="displayName" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" />
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default CreateAccount