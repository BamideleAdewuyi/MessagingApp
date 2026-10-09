import styles from "./ChatPreview.module.css"
import { useState, useEffect } from "react";

function ChatPreview({ chat, handleClick }) {
    const message = chat[0].message;
    const [recipientName, setRecipientName] = useState('');
    return(
        <div className={styles.chatPreviewContainer} >
            <h1></h1>
            <p>{message}</p>
        </div>
    )
}

export default ChatPreview