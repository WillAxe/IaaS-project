import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LinkTo from "./linkTo"
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <main className="applications-container">
        <h1>Mina ansökningar</h1>
        <section className="applications-list">
          {application.length === 0 ? (
            <p className="no-applications">Du har inga sökta jobb ännu</p>
          ) : (
            application.map((application) => (
              <div
                className="application-card"
                key={application.application_id}
              >
                <div className="application-title">
                  <h2>{application.job_title}</h2>
                  <span
                    className={`status ${
                      application.status === "Accepted"
                        ? "status-accepted"
                        : application.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="application-date">
                  Ansökt:{" "}
                  <strong>{formatDate(application.application_date)}</strong>
                </p>
                <LinkTo body={application} bodies="jobpost"></LinkTo>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  )
}
export default MyApplications
