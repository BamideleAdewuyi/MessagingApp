import styles from "./Chats.module.css"
import Chat from "../Chat/Chat"
import ChatPreview from "../ChatPreview/ChatPreview"
import { useState, useEffect } from "react"

function Chats() {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getChats() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await fetch(`${import.meta.env.VITE_API_PORT}/chats`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })

                const data = await res.json();

                if (res.ok) {
                    setChats(data.chats);
                    setIsLoading(false);
                } else {
                    setChats(null);
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
        getChats();
    }, []);

    if (!isLoading) {
        return(
            <div className={styles.chatsContainer}>
                <div className={styles.chatStrip}>
    
                </div>
                <div className={styles.selectedChat}>
                    
                </div>
            </div>
        )
    } else {
        return(
            <div className={styles.loadingContainer}>
                <h1>Loading</h1>
            </div>
        )
    }
}

export default Chats