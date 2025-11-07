const connectionString = require("../database-connection/connectionPostgres")

function getApplications() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM applications;"
    connectionString.query(query, (err, rows) => {
      if (err) reject(err)
      else resolve()
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

function getUsersApplications() {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT Users.user_name, Job_Posts.job_title
    FROM Applications
    INNER JOIN Users ON Applications.user_id = Users.user_id
    INNER JOIN Job_Posts ON Applications.job_id = Job_Posts.job_id
    INNER JOIN Users ON Applications.user_experience = Users.user_experience
    INNER JOIN Users ON Applications.user_education = Users.user_education
    `
    connectionString.query(query, (err, rows) => {
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
