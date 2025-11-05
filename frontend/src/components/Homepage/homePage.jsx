import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./styles/homePage.css"
import LinkTo from "./linkTo"

function HomePage() {
  const [jobPost, setJobPost] = useState([])
  useEffect(() => {
    fetch("/jobmatch/jobs")
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setJobPost(result)
      })
  }, [])

  // const navbarStyle = {
  //   backgroundColor: "lightblue",
  //   boxShadow: "0 2px 5px rgba(31, 14, 14, 0.1)",
  //   padding: "12px 24px",
  // }

  // const containerStyle = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   maxWidth: "1000px",
  //   margin: "0 auto",
  // }

  // const logoStyle = {
  //   fontSize: "1.5rem",
  //   fontWeight: "bold",
  //   color: "#2563eb",
  //   textDecoration: "none",
  // }

  // const linksContainer = {
  //   display: "flex",
  //   gap: "24px",
  // }

  // const linkStyle = {
  //   color: "#333",
  //   textDecoration: "none",
  //   fontWeight: "500",
  // }

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="navbarStyle">
          <div className="containerStyle">
            <Link
              to="/homepage/:userid"
              className="logoStyle"
              onMouseOver={(e) => (e.target.style.color = "#1e40af")}
              onMouseOut={(e) => (e.target.style.color = "#2563eb")}
            >
              JobMatch
            </Link>
            <div className="linksContainer">
              <Link
                to="/profilepage/"
                className="linkStyle"
                onMouseOver={(e) => (e.target.style.color = "#2563eb")}
                onMouseOut={(e) => (e.target.style.color = "#333")}
              >
                Profil
              </Link>
              <div className="linkContainer">
              <Link
                to="/"
                className="linkStyle"
                onMouseOver={(e) => (e.target.style.color = "#2563eb")}
                onMouseOut={(e) => (e.target.style.color = "#333")}
              >
                Logga ut
              </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main>
        <section className="job-postings">
          {jobPost.map((jobPost) => (
            <div className="post" key={jobPost.job_id}>
              <h2 className="headline">{`${jobPost.job_title}`}</h2>
              <p className="job-role">{`${jobPost.job_role}`}</p>
              <p className="company">{`${jobPost.company_name}`}</p>
              <p className="job-description">{`${jobPost.job_description}`}</p>
              <p className="post-date">{`${jobPost.posted_date}`}</p>
              <LinkTo body={jobPost} bodies="jobs"></LinkTo>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default HomePage
