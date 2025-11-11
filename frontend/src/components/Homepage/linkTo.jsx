import { Link } from "react-router-dom"
import "./styles/homePage.css"

const linkStyle = {
  textDecoration: "none",
  color: "#121212ff",
  fontSize: "15px",
}

// Send props for homePage to be able to send the job id as a prop so each job sends the user to the correct page
function LinkTo({ body, bodies }) {
  const jobId = body.job_id
  let buttonText = "Ansök"

  if (body.status) {
    buttonText = "Visa jobbannons"
  } else if (bodies === "jobpost") {
    buttonText = "Ansök"
  }
  return (
    <>
      <Link style={linkStyle} to={`/${bodies}/${jobId}`}>
        <button className="apply-button">{buttonText}</button>
      </Link>
    </>
  )
}
export default LinkTo
