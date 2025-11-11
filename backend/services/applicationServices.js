const connectionString = require("../database-connection/connectionPostgres")

function getApplications() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM applications;"
    connectionString.query(query, (err, rows) => {
      if (err) reject(err)
      else resolve(rows.rows)
    })
  })
}

function getApplicationById(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Applications WHERE application_id = $1"
    connectionString.query(query, [id], (err, rows) => {
      if (err) reject(err)
      else resolve(rows.rows)
    })
  })
}

function getUsersApplications(userId) {
  return new Promise((resolve, reject) => {
    // call the tables alias instead of the their full name for easier code and less charcatcters
    const query = `
      SELECT a.*, u.user_name, jp.job_title, status
      FROM Applications a
      INNER JOIN Users u ON a.user_id = u.user_id
      INNER JOIN Job_Posts jp ON a.job_id = jp.job_id
      WHERE a.user_id = $1
      ORDER BY a.application_id DESC
    `
    connectionString.query(query, [userId], (err, rows) => {
      if (err) reject(err)
      else resolve(rows.rows)
    })
  })
}

function sendApplication({ user_id, job_id, user_experience, user_education }) {
  return new Promise((resolve, reject) => {
    const values = [user_id, job_id, user_experience, user_education]
    const query =
      "INSERT INTO Applications(user_id, job_id, user_experience, user_education) VALUES ($1, $2, $3, $4) RETURNING *;"
    connectionString.query(query, values, (err, rows) => {
      if (err) reject(err)
      else resolve(rows.rows[0])
    })
  })
}

module.exports = {
  getApplications,
  getApplicationById,
  getUsersApplications,
  sendApplication,
}
