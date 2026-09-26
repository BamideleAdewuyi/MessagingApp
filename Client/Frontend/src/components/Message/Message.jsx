import styles from "./Message.module.css"

function Message({ text, sentAt }) {
    return(
        <div className={styles.messageContainer}>
            <p className={styles.messageText}>{text}</p>
            <p className={styles.messageTime}>{sentAt}</p>
        </div>
    )
}

export default Message