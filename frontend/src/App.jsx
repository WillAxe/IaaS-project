import "./App.css"
import LoginPage from "./components/Welcomepage/welcome"
import CreateAccount from "./components/Welcomepage/createAccount"
import HomePage from "./components/Homepage/homePage"
import MyApplications from "./components/Homepage/myApplications"

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
        { element: <HomePage />, path: "/homePage/:userid" },
        { element: <MyApplications />, path: "/applications/:userid" },
      ],
      element: (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
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
