const pool = require("../database-connection/connectionPostgres"); 

exports.getAllJobs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM job_posts ORDER BY posted_date DESC");
    return (result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw  error;
  }
};
