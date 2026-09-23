import { Link } from "react-router";

function Navbar({ user, setUser }) {
    return (
        <>
            <nav>
                 <Link className="link" to="/">Home</Link>
                 {user ? 
                 <>
                 <Link className="link" onClick={() => {
                    setUser(null);
                    localStorage.removeItem("token");
                    }}>Log Out</Link>
                <Link className="link" to="/chats">Chats</Link>
                 </> : 
                 <>
                 <Link className="link" to="/login">Log In</Link>
                 <Link className="link" to="/createAccount">Create Account</Link>
                 </> }
            </nav>
        </>
    )
};

export default Navbar;