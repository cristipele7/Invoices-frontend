import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './login/Login';
import Invoices from './invoices/Invoices';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: '/invoices',
      element: <Invoices />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
