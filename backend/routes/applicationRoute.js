const express = require("express")
const router = express.Router()
const applicationController = require("../controllers/applicationControllers")

router.get("/applications", applicationController.getApplications)
router.get(
  "/applications/:applicationid",
  applicationController.getApplicationById
)

router.get("/applicationuser", applicationController.getUsersApplications)

module.exports = router
