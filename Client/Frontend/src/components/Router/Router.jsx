import App from '../../App'
import { createBrowserRouter } from 'react-router'
import Homepage from '../Homepage/Homepage'
import LogIn from '../LogIn/LogIn'
import CreateAccount from '../CreateAccount/CreateAccount'
import Chats from '../Chats/Chats'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: "/", element: <Homepage />},
        {path: "/logIn", element: <LogIn />},
        {path: "/createAccount", element: <CreateAccount />},
        {path: "/chats", element: <Chats />}
    ]
  }
])

export default router