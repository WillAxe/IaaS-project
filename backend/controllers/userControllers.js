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

exports.createUser = async (req, res) => {
  const { user_name, User_Password, User_Email } = req.body
  try {
    await userServices.createUser({ user_name, User_Password, User_Email })
    return res
      .status(201)
      .json({ sucess: true, message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error creating user" })
  }
}
