import styles from "./ChatPreview.module.css"

function ChatPreview({ chat, chatWith, handleClick }) {
    const message = chat.messages[0];
    return(
        <div className={styles.chatPreviewContainer} onClick={() => handleClick(chat)}>
            <h1>{chatWith}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ChatPreview