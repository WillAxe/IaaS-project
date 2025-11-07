const jobServices = require("../services/JobServices")

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobServices.getAllJobs()
    res.status(200).json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    res.status(500).json({ error: "Failed to fetch jobs" })
  }
}

exports.getJobById = async (req, res) => {
  const { id } = req.params
  try {
    const job = await jobServices.getJobById(id)
    res.status(200).json(job)
  } catch (error) {
    console.error("Error fetching job by Id", error)
    res.status(500).json({ error: "Failed to fetch job by the id" })
  }
}
