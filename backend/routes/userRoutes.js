const express = require("express")
const router = express.Router()

const userController = require("../controllers/userControllers")

router.get("/users", userController.getAllUsers)
router.get("/user/:id", userController.getUserById)

router.post("/users", userController.createUser)
router.post("/login", userController.loginUser)

router.delete("/user/:id", userController.deleteUserById)

router.put("/user/:id", userController.updateUser)

router.put("/user/experience/:id", userController.updateUserExperience)

module.exports = router
