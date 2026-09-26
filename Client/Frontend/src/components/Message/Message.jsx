import styles from "./Message.module.css"

function Message({ id }) {
    return(
        <div className={styles.messageContainer}>
            <p className={styles.messageText}>{}</p>
            <p className={styles.messageTime}>{}</p>
        </div>
    )
}

export default Message