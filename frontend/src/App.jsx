import { lazy, Suspense } from "react"
import "./App.css"
import LoginPage from "./components/Welcomepage/welcome"
import CreateAccount from "./components/Welcomepage/createAccount"
import HomePage from "./components/Homepage/homePage"
const MyApplications = lazy(() =>
  import("./components/Homepage/myApplications")
)
import ProfilePage from "./components/Homepage/profilePage"
import JobPost from "./components/Homepage/jobPost"
import AccountSettings from "./components/Homepage/AccountSettings"
import PrivacyPolicy from "./privacyPolicy"
import TermsOfService from "./termsOfService"

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

        {
          element: <HomePage />,
          path: "/homePage/:userid",
        },
        {
          element: (
            <Suspense fallback={<>Laddar...</>}>
              <MyApplications />
            </Suspense>
          ),
          path: "/applications/user/:userid",
        },
        { element: <ProfilePage />, path: "/profilePage/:userid" },
        { element: <JobPost />, path: "/jobpost/:jobid" },
        { element: <AccountSettings />, path: "/account-settings/:userid" },
        { element: <PrivacyPolicy />, path: "/privacy-policy" },
        { element: <TermsOfService />, path: "/terms-of-service" },
      ],
      element: (
        <>
          <nav>
            <ul></ul>
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
