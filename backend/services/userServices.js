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
    connectionString.query(query, values, (error, result) => {
      if (error) reject(error)
      else resolve(result.rows[0])
    })
  })
}

//Post call for when a existing user is loggin in and matching credentials with correct user mail and password
function loginUser(user_mail, user_password) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Users WHERE user_mail = $1 AND user_password = $2;"
    connectionString.query(
      query,
      [user_mail, user_password],
      (error, results) => {
        if (error) reject(error)
        else if (results.rows.length === 0) {
          resolve()
        } else {
          resolve(results.rows[0])
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
<<<<<<< HEAD
      "UPDATE Users SET user_name = $1, user_mail = $2 WHERE user_id = $3 RETURNING *;"
=======
      "UPDATE Users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *;"
>>>>>>> main
    connectionString.query(query, values, (error, results) => {
      if (error) reject(error)
      else resolve(results.rows[0])
    })
  })
}

function updateUserExperience(id, { user_experience }) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE Users SET user_experience = $1 WHERE user_id = $2 RETURNING *;"
    connectionString.query(query, [user_experience, id], (error, results) => {
      if (error) reject(error)
      else resolve(results.rows[0])
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
  updateUserExperience,
}
