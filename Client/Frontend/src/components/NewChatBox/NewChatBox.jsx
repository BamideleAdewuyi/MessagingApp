import styles from "./NewChatBox.module.css"
import { useRef, useEffect, useState } from "react";

function NewChatBox({ open, contacts, toggleNewChatBox, setSelectedChat, setRefreshKey }) {
    const dialogRef = useRef();
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    async function getRecipientId() {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/searchUsername/${recipient}`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })
                const data = await res.json();
                if (res.ok) {
                    return Number(data.user.id);
                } else {
                    console.log("No user found");
                    return;
                }
            } else {
                console.log("Not authorised");
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function createNewChat(recipientId) {
        const token = localStorage.getItem("token");
        const newChatObj = { recipientId };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/newChat`, {
                        method: "POST",
                        body: JSON.stringify(newChatObj),
                        headers: { "Authorization": `Bearer ${token}`, "content-type": "application/json" },
            });
            const data = await res.json();
            if (data.msg) {
                console.log(data.msg);
                return data.newChat.id;
            } else {
                console.log(data.errors);
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function addMessageToChat(chatId) {
        const token = localStorage.getItem("token");
        const newMessageObj = { message, chatId };
        try {
            const res = await fetch(`${import.meta.env.VITE_API_PORT}/newMessage`, {
                        method: "POST",
                        body: JSON.stringify(newMessageObj),
                        headers: { "Authorization": `Bearer ${token}`, "content-type": "application/json" },
            });
            const data = await res.json();
            if (data.msg) {
                console.log(data.msg);
                return;
            } else {
                console.log(data.errors);
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function sendMessage(e) {
        e.preventDefault();
        const activeRecipientId = await getRecipientId();
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch(`${import.meta.env.VITE_API_PORT}/checkChat/${activeRecipientId}`, {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                })

                const data = await res.json();
                if (res.ok) {
                    if (data.chat) {
                        const chatId = Number(data.chat.id);
                        await addMessageToChat(chatId);
                        setRefreshKey(prev => !prev);
                        setSelectedChat(chatId);
                        toggleNewChatBox();
                        return
                    } else {
                        const chatId = await createNewChat(activeRecipientId);
                        await addMessageToChat(Number(chatId));
                        setRefreshKey(prev => !prev);
                        setSelectedChat(Number(chatId));
                        toggleNewChatBox();
                        return;
                    }
                } else {
                    console.log("Failed");
                    toggleNewChatBox();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.newChatBoxContainer}>
            <dialog className={styles.newChatBoxDialog} ref={dialogRef}>
                <form className={styles.newChatBoxForm} onSubmit={(e) => sendMessage(e)}>
                    <h1>Start a new chat</h1>
                    <label htmlFor="message">Write message</label>
                    <textarea className={styles.newChatBoxMessageInput} type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <label htmlFor="contacts">Choose a contact</label>
                    <input list="contacts" name="contacts" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    <datalist id="contacts">
                        {contacts.map(( contact, index ) => (
                            <option key={index} value={contact.username}>{contact.username}</option>
                        ))}
                    </datalist>
                    <button type="submit">Start Chat</button>
                    <button type="button" onClick={() => toggleNewChatBox()}>Close</button>
                </form>
            </dialog>
        </div>
    )
}

export default NewChatBox