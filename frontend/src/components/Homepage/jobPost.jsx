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

  const [formData, setFormData] = useState({
    user_id: userId,
    job_id: jobid,
    userExp: userExp.user_experience,
    userEd: userEd.user_education,
  })
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
        setUserExp(result.user)
        setUserEd(result.user)
      })
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    try {
      const payLoad = {
        user_id: formData.user_id,
        job_id: formData.job_id,
        user_experience: formData.userExp,
        user_education: formData.userEd,
      }

      const response = await fetch(`/jobmatch/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payLoad),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data.application)
        setFormData({
          user_id: userId,
          job_id: jobid,
          userExp: userExp.user_experience,
          userEd: userEd.user_education,
        })
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
              <ul>{`${userExp.user_experience}`}</ul>
            </div>
            <div>
              <p>Utbildning</p>
              <ul>
                <li>{`${userEd.user_education}`}</li>
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
