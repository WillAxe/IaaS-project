const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/jobs_posts', jobController.getAllJobs);