import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
function JobPost() {
  const { jobid } = useParams()
  const [jobPost, setJobPost] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/jobmatch/jobpost/${jobid}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setJobPost(result[0])
      })
  }, [jobid])
  return (
    <>
      <main>
        <h1>{`${jobPost.job_title}`}</h1>

        <p></p>
      </main>
    </>
  )
}

export default JobPost
