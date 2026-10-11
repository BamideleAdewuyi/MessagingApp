import styles from "./Chat.module.css"
import Message from "../Message/Message"
import { useState, useEffect } from "react"

function Chat({ chatId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        async function getMessages() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await fetch(`${import.meta.env.VITE_API_PORT}/chat/${chatId}`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })

                const data = await res.json();

                if (res.ok) {
                    setMessages(data.chat.messages.reverse());
                    setIsLoading(false);
                } else {
                    console.log("Chat unavailable");
                    setIsLoading(false);
                    localStorage.removeItem("token");
                }
                } else {
                    setIsLoading(false);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [chatId]);
    if (!isLoading && messages.length > 0) {
        return(
            <div className={styles.chatContainer}>
                <div className={styles.messagesContainer}>
                    {messages.map((message, index) => (
                        <div key={index}  className={styles.messageContainer}>
                            <Message message={message}/>
                        </div>
                    ))}
                </div>
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

export default Chat