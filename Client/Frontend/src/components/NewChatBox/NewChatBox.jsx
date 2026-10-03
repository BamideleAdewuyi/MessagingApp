import styles from "./NewChatBox.module.css"
import { useRef, useEffect } from "react";

function NewChatBox({ open, contacts, toggleNewChatBox }) {
    const dialogRef = useRef();

    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    return(
        <div className={styles.newChatBoxContainer}>
            <dialog ref={dialogRef}>
                <form>
                    <h1>Start a new chat</h1>
                    <label htmlFor="contacts">Choose a contact</label>
                    <input list="contacts" name="contacts" />
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