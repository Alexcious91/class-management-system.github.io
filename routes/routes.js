const express = require('express');
const router = express.Router();

// Import controllers
const { getDashboardPage, getRegisterPage, getLoginPage, getAddStudentForm, getEnrollCourseForm,  } = require('../controllers/mainController.js')

router.get('/admin', getDashboardPage);
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage)
router.get('/add-student', getAddStudentForm);
router.get('/enroll-course', getEnrollCourseForm);

module.exports = router;