import { Link } from "react-router-dom"

function LinkTo(props) {
  const jobId = props.body.job_id
  return (
    <>
      <Link to={`/${props.bodies}/${jobId}`}>Click here</Link>
    </>
  )
}
export default LinkTo
