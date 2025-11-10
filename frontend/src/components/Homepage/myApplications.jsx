import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
function MyApplications() {
  const [application, setApplication] = useState([])
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetch(`/jobmatch/applications/user/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.userApplications)
        setApplication(result.userApplications)
      })
  }, [userId])

  return (
    <>
      <section>
        {application.map((application) => (
          <div className="application-card" key={application.application_id}>
            <h2>{application.job_title}</h2>
          </div>
        ))}
      </section>
    </>
  )
}
export default MyApplications
