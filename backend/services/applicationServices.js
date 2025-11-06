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
    `
    connectionString.query(query, (err, rows) => {
      if (err) reject(err)
      else resolve(rows.rows)
    })
  })
}

module.exports = {
  getApplications,
  getApplicationById,
  getUsersApplications,
}
