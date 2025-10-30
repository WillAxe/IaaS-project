const connectionString = require("../database-connection/connectionPostgres")

//Function to get all users from the database
function getAllUsers() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users;"
    connectionString.query(query, (error, results) => {
      if (error) reject(error)
      else resolve(results.rows)
    })
  })
}

//Post call for creating a new user in the database
function createUser({ user_name, User_Password, User_Email }) {
  return new Promise((resolve, reject) => {
    const values = [user_name, User_Password, User_Email]
    const query =
      "INSERT INTO Users (user_name, User_Password, User_Email) VALUES ($1, $2, $3) RETURNING *"
    connectionString.query(query, values, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

module.exports = {
  getAllUsers,
  createUser,
}
