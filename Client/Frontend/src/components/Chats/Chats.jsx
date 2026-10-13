import styles from "./Chats.module.css"
import Chat from "../Chat/Chat"
import NewChatBox from "../NewChatBox/NewChatBox"
import ChatPreview from "../ChatPreview/ChatPreview"
import { useState, useEffect } from "react"
import Error from "../Error/Error";

function Chats() {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [refreshKey, setRefreshKey] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

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

    async function sendMessage(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const messageObj = { message, chatId: selectedChat };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/newMessage`, {
                        method: "POST",
                        body: JSON.stringify(messageObj),
                        headers: { "Authorization": `Bearer ${token}`, "content-type": "application/json" },
            });

            const data = await res.json();
            console.log(data)

            if (data.newMessage) {
                setRefreshKey(prev => !prev);
                setMessage("");
                return;
            } else {
                console.log("dawg: ",data.errors);
                setErrors(data.errors.map((error) => error.msg));
            }

        } catch(error) {
            console.log(error);
        }
    }

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
                        <Chat chatId={selectedChat} refreshKey={refreshKey}/>
                    </div>
                </div>
                {errors.length > 0 && 
                    <>
                        <ul>
                            {errors.map((error, index) => (
                                    <li key={index}><Error error={error} /></li>
                                ))}
                        </ul>
                    </> }
                <div className={styles.newMessageContainer}>
                    <button type="button" onClick={() => toggleNewChatBox()}>New Chat</button>
                    <div className={styles.newMessageFormContainer}>
                        <form onSubmit={(e) => sendMessage(e)} className={styles.newMessageForm}>
                            <label htmlFor="message">Message</label>
                            <textarea className={styles.newMessageInput} type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <NewChatBox open={open} toggleNewChatBox={toggleNewChatBox} contacts={contacts} setSelectedChat={setSelectedChat} setRefreshKey={setRefreshKey} setErrors={setErrors} />
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