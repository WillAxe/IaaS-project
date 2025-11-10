const express = require("express")
const router = express.Router()
const applicationController = require("../controllers/applicationControllers")

router.get("/applications", applicationController.getApplications)
router.get(
  "/applications/:applicationid",
  applicationController.getApplicationById
)
// Get applications for a specific user (by user id)
router.get(
  "/applications/user/:userid",
  applicationController.getUsersApplications
)

router.post("/applications", applicationController.sendApplication)

module.exports = router
