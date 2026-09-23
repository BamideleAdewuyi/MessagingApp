import App from '../../App'
import { createBrowserRouter } from 'react-router'
import Homepage from '../Homepage/Homepage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: "/", element: <Homepage />},
    ]
  }
])

export default router