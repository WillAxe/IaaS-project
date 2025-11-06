import { Link } from "react-router-dom"

// Send props for homePage to be able to send the job id as a prop so each job sends the user to the correct page
function LinkTo(props) {
  const jobId = props.body.job_id
  return (
    <>
      <Link to={`/${props.bodies}/${jobId}`}>Click here</Link>
    </>
  )
}
export default LinkTo
