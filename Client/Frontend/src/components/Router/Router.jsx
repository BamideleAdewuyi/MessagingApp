import App from '../../App'
import { createBrowserRouter } from 'react-router'
import Homepage from '../Homepage/Homepage'
import LogIn from '../LogIn/LogIn'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: "/", element: <Homepage />},
        {path: "/logIn", element: <LogIn />},
    ]
  }
])

export default router