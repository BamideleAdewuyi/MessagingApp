import styles from "./Chats.module.css"
import Chat from "../Chat/Chat"
import { useState, useEffect } from "react"

function Chats() {
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