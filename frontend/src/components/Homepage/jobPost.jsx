import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
      <main>
        <h1>{`${jobPost.job_title}`}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Om jobbet</h2>
            <p>{`${jobPost.job_description}`}</p>
            <div>
              <p>Dina erfarenheter:</p>
              <p>{`${userExp}`}</p>
              {/* {Array.isArray(userExp) ? (
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
              )} */}
            </div>
            <div>
              <p>Utbildning</p>
              <ul>
                <li>{userEd}</li>
              </ul>
            </div>
            <button type="submit">Skicka ansökan</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default JobPost
