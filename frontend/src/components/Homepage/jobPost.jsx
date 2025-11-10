import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/jobPost.css"
function JobPost() {
  const navigate = useNavigate()
  const { jobid } = useParams()
  const [jobPost, setJobPost] = useState([])
  const [userExp, setUserExp] = useState("")
  const [userEd, setUserEd] = useState("")

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetch(`/jobmatch/jobpost/${jobid}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setJobPost(result[0])
      })
  }, [jobid])

  useEffect(() => {
    fetch(`/jobmatch/user/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setUserExp(result.user?.user_experience ?? "")
        setUserEd(result.user?.user_education ?? "")
      })
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      user_id: userId,
      job_id: jobid,
      user_experience: userExp ?? "",
      user_education: userEd ?? "",
    }
    console.log(payload)
    try {
      const response = await fetch(`/jobmatch/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        navigate(`/homePage/${userId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <main className="main">
        <div className="container">
          <h1 className="page-header">{`${jobPost.job_title}`}</h1>
          <p className="company">
            <strong>{`${jobPost.company_name}`}</strong>
          </p>
          <section className="about-sectipn">
            <h2 className="about-header">Om jobbet</h2>
            <p className="about-description">{`${jobPost.job_description}`}</p>
          </section>
          <section>
            <h3 className="experiences">Dina erfarenheter</h3>
            {Array.isArray(userExp) ? (
              <ul>
                {userExp.map((exp, i) => (
                  <li key={i}>
                    {typeof exp === "object"
                      ? `${exp.company ?? ""} - ${exp.title ?? ""} (${
                          exp.years ?? ""
                        })`
                      : exp}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>{userExp}</li>
              </ul>
            )}
          </section>
          <section>
            <h3 className="education">Utbildning:</h3>
            {Array.isArray(userEd) ? (
              <ul>
                {userEd.map((ed, i) => (
                  <li key={i}>
                    {typeof ed === "object"
                      ? `${ed.school ?? ""}- ${ed.degree ?? ""} (${
                          ed.years ?? ""
                        })`
                      : ed}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>{userEd}</li>
              </ul>
            )}
          </section>
          <form onSubmit={handleSubmit}>
            <button className="submit-btn" type="submit">
              Skicka ansökan
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default JobPost
