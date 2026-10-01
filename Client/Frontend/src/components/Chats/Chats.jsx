import styles from "./Chats.module.css"
import Chat from "../Chat/Chat"
import { useState, useEffect } from "react"

function Chats() {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getToken() {
        try {
            const token = localStorage.getItem("token");
            if (token) {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/validate`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
            })

            const data = await res.json();

            if (res.ok) {
                setUser(data);
                setIsLoading(false);
            } else {
                setUser(null);
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
        getToken()
    }, []);

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