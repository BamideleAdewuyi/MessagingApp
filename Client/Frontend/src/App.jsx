import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!isLoading) {
    return (
      <>
        <Navbar user={user} setUser={setUser} />
        <Outlet />
      </>
    )
  } else {

    return (
      <>
        <h1>Loading</h1>
      </>
    )

  }
}

export default App
