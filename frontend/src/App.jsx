import "./App.css"
import LoginPage from "./components/Welcomepage/welcome"

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom"
function App() {
  const router = createHashRouter([
    {
      children: [{ element: <LoginPage />, path: "/" }],
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
