const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobControllers');

router.get('/jobs', jobController.getAllJobs);

module.exports = router;