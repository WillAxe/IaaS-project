const userServices = require("../services/userServices")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers()
    res.json({ users })
  } catch (error) {
    res.status(500).json({ error: "Error getting users" })
    console.error(error)
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await userServices.getUserById(id)
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: "Error getting user by ID" })
  }
}

exports.createUser = async (req, res) => {
  const { user_name, user_password, user_mail } = req.body
  try {
    const newUser = await userServices.createUser({
      user_name,
      user_password,
      user_mail,
    })
    // return the created row and include a user_id alias for frontend compatibility
    return res.status(201).json({
      success: true,
      data: newUser,
      user_id: newUser.user_id,
      message: "User created successfully",
    })
  } catch (error) {
    res.status(500).json({ error: "Error creating user" })
  }
}

exports.loginUser = async (req, res) => {
  const { user_mail, user_password } = req.body
  try {
    const user = await userServices.loginUser(user_mail, user_password)
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    } else {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user_id: user.user_id,
        user_name: user.user_name,
      })
    }
  } catch (error) {
    return res.status(500).json({ error: "Error loggin in user" })
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    await userServices.deleteUserById(id)
    res.json({ message: "Your accont has been deleted" })
  } catch (error) {
    return res.status(500).json({ error: "Could not delete the account!" })
  }
}

//Uppdatera sit konto
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { user_name, user_mail } = req.body
    const updated = await userServices.updateUser(id, {
      user_name,
      user_mail,
    })
    res.json({ message: updated })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
