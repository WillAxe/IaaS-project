import "./App.css"
import LoginPage from "./components/Welcomepage/welcome"
import CreateAccount from "./components/Welcomepage/createAccount"

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom"
function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <LoginPage />, path: "/" },
        { element: <CreateAccount />, path: "/createAccount" },
      ],
      element: (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <Link to="/createAccount">createAccount</Link>
            </ul>
          </nav>
          <main>
            <Outlet></Outlet>
          </main>
        </>
      ),
    },
  ])
  return <RouterProvider router={router} />
}

export default App
