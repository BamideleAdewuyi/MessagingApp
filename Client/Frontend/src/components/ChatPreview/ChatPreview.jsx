import styles from "./ChatPreview.module.css"
import { useState, useEffect } from "react";

function ChatPreview({ chat, handleClick, selectedChat }) {
    const message = chat.messages[0];
    const chatId = chat.id;

    const [isLoading, setIsLoading] = useState(true);
    const [recipientName, setRecipientName] = useState('');

    useEffect(() => {
        async function getRecipientName() {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/findRecipient/${chatId}`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                });

                const data = await res.json();

                if (res.ok) {
                    setRecipientName(data.recipient.username);
                    setIsLoading(false);
                } else {
                    console.log("Name unavailable");
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
            }
        };
        getRecipientName();
    }, [chatId]);

    if (!isLoading) {
        return(
            <div style={Number(chatId) == Number(selectedChat) ? {fontWeight: "bold"} : {fontWeight: "normal"}} className={styles.chatPreviewContainer} onClick={() => handleClick(chatId)}>
                <h1>{recipientName}</h1>
                <p>{message?.message || "No messages yet"}</p>
            </div>
        )
    } else {
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
}

export default ChatPreview