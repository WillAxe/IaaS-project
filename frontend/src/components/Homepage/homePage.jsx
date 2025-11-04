import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

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

  const navbarStyle = {
    backgroundColor: "lightblue",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    padding: "12px 24px",
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
  }

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
    textDecoration: "none",
  }

  const linksContainer = {
    display: "flex",
    gap: "24px",
  }

  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
  }

  return (
    <>
      <div>
        {/* Navbar */}
        <nav style={navbarStyle}>
          <div style={containerStyle}>
            <Link
              to="/homepage/:userid"
              style={logoStyle}
              onMouseOver={(e) => (e.target.style.color = "#1e40af")}
              onMouseOut={(e) => (e.target.style.color = "#2563eb")}
            >
              JobMatch
            </Link>
            <div style={linksContainer}>
              <Link
                to="/profilepage"
                style={linkStyle}
                onMouseOver={(e) => (e.target.style.color = "#2563eb")}
                onMouseOut={(e) => (e.target.style.color = "#333")}
              >
                Profil
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <header>
        <h1>Home Page</h1>
        <p>Welcome to the Home Page!</p>
      </header>
      <main>
        <section className="job-postings">
          {jobPost.map((jobPost) => (
            <div className="post" key={jobPost.job_id}>
              <h2 className="headline">{`${jobPost.job_title}`}</h2>
              <p className="job-role">{`${jobPost.job_role}`}</p>
              <p className="company">{`${jobPost.company_name}`}</p>
              <p className="job-description">{`${jobPost.job_description}`}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default HomePage
