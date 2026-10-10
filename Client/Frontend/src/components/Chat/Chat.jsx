import styles from "./Chat.module.css"
import Message from "../Message/Message"
import { useState, useEffect } from "react"

function Chat({ chatId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [chat, setChat] = useState(null);

    useEffect(() => {
        async function getChat() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await fetch(`${import.meta.env.VITE_API_PORT}/chat/${chatId}`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })

                const data = await res.json();

                if (res.ok) {
                    setChat(data.chat);
                    console.log(data)
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
        getChat();
    }, [chatId]);
    return(
        <div className={styles.chatContainer}>

        </div>
    )
}

export default Chat