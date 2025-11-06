import { Link } from "react-router-dom"

const linkStyle = {
  textDecoration: "none",
  color: "#121212ff",
  fontSize: "15px",
}

// Send props for homePage to be able to send the job id as a prop so each job sends the user to the correct page
function LinkTo(props) {
  const jobId = props.body.job_id
  return (
    <>
      <Link style={linkStyle} to={`/${props.bodies}/${jobId}`}>
        Ansök
      </Link>
    </>
  )
}
export default LinkTo
