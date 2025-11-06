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
  const { id } = req.params
  try {
    const application = await applicationsServices.getApplicationById(id)
    res.json({ application })
  } catch (error) {
    res.status(500).json({
      error: "Error fetching application",
    })
  }
}

exports.getUsersApplications = async (req, res) => {
  try {
    const userApplications = await applicationsServices.getUsersApplications()
    res.json({ userApplications })
  } catch (error) {
    res.status(500).json({
      error: "Error getting users applications",
    })
  }
}
