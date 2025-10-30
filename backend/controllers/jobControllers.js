const jobServices = require("../services/JobServices");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobServices.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
