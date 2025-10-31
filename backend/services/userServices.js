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

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users WHERE user_id = $1;"
    connectionString.query(query, [id], (error, results) => {
      if (error) reject(error)
      else resolve(results.rows[0])
    })
  })
}

//Post call for creating a new user in the database
function createUser({ user_name, user_password, user_mail }) {
  return new Promise((resolve, reject) => {
    const values = [user_name, user_password, user_mail]
    const query =
      "INSERT INTO Users (user_name, user_password, user_mail) VALUES ($1, $2, $3) RETURNING *"
    connectionString.query(query, values, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

//Post call for when a existing user is loggin in and matching credentials with correct user mail and password
function loginUser(user_mail, user_password) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Users WHERE user_mail = $1 AND user-password = $2;"
    connectionString.query(
      query,
      [user_mail, user_password],
      (error, results) => {
        if (error) reject(error)
        else if (results.rows.length === 0) {
          resolve() // User not found
        } else {
          resolve(results.rows[0]) // User found
        }
      }
    )
  })
}

function deleteUserById(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Users WHERE user_id = $1;"
    connectionString.query(query, [id], (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

function updateUser(id, { user_name, user_mail }) {
  return new Promise((resolve, reject) => {
    const values = [user_name, user_mail, id]
    const query =
      "UPDATE Users SET user_name = $1, user_mail = $2 WHERE user_id = $3;"
    connectionString.query(query, values, (error, results) => {
      if (error) reject(error)
      else resolve("User updated successfully")
    })
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUserById,
  updateUser,
}
