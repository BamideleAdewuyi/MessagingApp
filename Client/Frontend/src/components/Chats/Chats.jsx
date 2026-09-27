import styles from "./Chats.module.css"

function Chats({ userId }) {
    return(
        <div className={styles.chatsContainer}>
            <div className={styles.chatStrip}>

            </div>
            <div className={styles.selectedChat}>
                
            </div>
        </div>
    )
}

export default Chats