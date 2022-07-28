var express = require('express');
var router = express.Router();
const multer = require('multer');

var {
  add_student,
  add_attendance
} = require('../controllers/student_controller.js');

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.post('/student', multer().none(), add_student);
router.post('/attendance', multer().none(), add_attendance);

module.exports = router;
