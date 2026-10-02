import styles from "./Message.module.css"

function Message({ message }) {
    return(
        <div className={styles.messageContainer}>
            <p className={styles.messageText}>{message.message}</p>
            <p className={styles.messagePostedAt}>{message.postedAt}</p>
        </div>
    )
}

export default Message