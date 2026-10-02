import styles from "./Chat.module.css"
import Message from "../Message/Message"

function Chat({ chat }) {
    const messages = chat.messages;
    return(
        <div className={styles.chatContainer}>
            {messages.map(({message, index}) => (
                    <Message key={index} message={message} />
                ))}
        </div>
    )
}

export default Chat