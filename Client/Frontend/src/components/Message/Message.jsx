import styles from "./Message.module.css"

function Message({ message }) {
    return(
        <div className={styles.messageContainer}>
            <p className={styles.messageText}>{}</p>
            <p className={styles.messageTime}>{}</p>
        </div>
    )
}

export default Message