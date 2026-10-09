import styles from "./ChatPreview.module.css"
import { useState, useEffect } from "react";

function ChatPreview({ chat, handleClick }) {
    const message = chat[0].message;

    const [isLoading, setIsLoading] = useState(true);
    const [recipientName, setRecipientName] = useState('');

    useEffect(() => {
        async function getRecipientName() {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/findRecipient/${chat[0].chatId}`, {
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
    }, [chat]);

    if (!isLoading) {
        return(
            <div className={styles.chatPreviewContainer} >
                <h1>{recipientName}</h1>
                <p>{message}</p>
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