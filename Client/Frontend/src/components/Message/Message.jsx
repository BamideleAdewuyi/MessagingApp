import { useOutletContext } from "react-router";
import styles from "./Message.module.css"

function Message({ message }) {
    const date = new Date (message.postedAt.substring(0, 10)).toLocaleDateString('en-GB');
    const time = new Date(message.postedAt).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })

    const {user} = useOutletContext();
    const userId = user.id;

    return(
        <div className={`${ styles.messageContainer } ${ Number(userId) === Number(message.authorId) ? styles.me : styles.them }`}>
            <p className={styles.messageText}>{message.message}</p>
            <p className={styles.messageTime}>{time}</p>
            <p className={styles.messageDate}>{date}</p>
        </div>
    )
}

export default Message