const pool = require("../connectionPostgres"); 

exports.getAllJobs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM job_posts ORDER BY posted_date DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
