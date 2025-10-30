// import { useState } from "react"
import "./App.css"
import Welcome from "./components/welcome"

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom"
function App() {
  const router = createHashRouter([
    {
      children: [{ element: <Welcome />, path: "/" }],
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
