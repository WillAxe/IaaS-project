const express = require("express")
const router = express.Router()
const jobController = require("../controllers/jobControllers")

router.get("/jobs", jobController.getAllJobs)
router.get("/jobpost/:id", jobController.getJobById)

module.exports = router
