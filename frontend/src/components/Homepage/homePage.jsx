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
  return (
    <>
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
