import styles from "./Chats.module.css"
import Chat from "../Chat/Chat"
import NewChatBox from "../NewChatBox/NewChatBox"
import ChatPreview from "../ChatPreview/ChatPreview"
import { useState, useEffect } from "react"

function Chats() {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [refreshKey, setRefreshKey] = useState(false);

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
                    !selectedChat && setSelectedChat(data.chats[0].id);
                    setIsLoading(false);
                } else {
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
    }, [refreshKey]);

    useEffect(() => {
        async function getContacts() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await fetch(`${import.meta.env.VITE_API_PORT}/contacts`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })

                const data = await res.json();

                if (res.ok) {
                    setContacts(data.contacts || []);
                    setIsLoading(false);
                } else {
                    setContacts(null);
                    setIsLoading(false);
                    localStorage.removeItem("token");
                }
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getContacts();
    }, [])

    function toggleNewChatBox() {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    function selectChat(chatId) {
        setSelectedChat(chatId);
    }

    if (!isLoading && selectedChat) {
        return(
            <div className={styles.chatsAndPreviewsContainer}>
                <div className={styles.chatsContainer}>
                    <div className={styles.chatStrip}>
                        {chats.length > 0 && 
                            chats.map((chat, index) => (
                                <ChatPreview key={index} chat={chat} handleClick={selectChat} selectedChat={selectedChat}/>
                        ))}
                    </div>
                    <div className={styles.selectedChat}>
                        <Chat chatId={selectedChat}/>
                    </div>
                </div>
                <div className={styles.newMessageContainer}>
                    <button type="button" onClick={() => toggleNewChatBox()}>New Chat</button>
                    <div className={styles.newMessageFormContainer}>
                        <form className={styles.newMessageForm}>
                            <label htmlFor="message">Message</label>
                            <textarea className={styles.newMessageInput} type="text" name="message" />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <NewChatBox open={open} toggleNewChatBox={toggleNewChatBox} contacts={contacts} setSelectedChat={setSelectedChat} setRefreshKey={setRefreshKey} />
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