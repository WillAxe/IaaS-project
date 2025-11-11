const applicationsServices = require("../services/applicationServices")

exports.getApplications = async (req, res) => {
  try {
    const applications = await applicationsServices.getApplications()
    res.json({ applications })
  } catch (error) {
    res.status(500).json({
      error: "Error getting applications",
    })
    console.error(error)
  }
}

exports.getApplicationById = async (req, res) => {
  const { applicationid } = req.params
  try {
    const application = await applicationsServices.getApplicationById(
      applicationid
    )
    res.json({ application })
  } catch (error) {
    res.status(500).json({
      error: "Error fetching application",
    })
  }
}

exports.getUsersApplications = async (req, res) => {
  const { userid } = req.params
  try {
    const userApplications = await applicationsServices.getUsersApplications(
      userid
    )
    res.json({ userApplications })
  } catch (error) {
    res.status(500).json({
      error: "Error getting users applications",
    })
  }
}

exports.sendApplication = async (req, res) => {
  const { user_id, job_id, user_experience, user_education } = req.body
  try {
    const newApplication = await applicationsServices.sendApplication({
      user_id,
      job_id,
      user_experience,
      user_education,
    })
    return res.status(201).json({
      success: true,
      data: newApplication,
      application_id: newApplication.application_id,
      message: "Successfully sent an application",
    })
  } catch (error) {
    res.status(500).json({
      error: "Sending the application",
    })
    console.error(error)
  }
}
