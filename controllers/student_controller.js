var BaseDeDatos = require("../dao/BaseDeDatos.js");

let baseDeDatos = new BaseDeDatos();

const add_student = async (req, res, next) => {

  try {
    const student = await baseDeDatos.add_student(req.body.email, req.body.name, req.body.image)
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
}

const add_attendance = async (req, res, next) => {

  try {
    const attendance = await baseDeDatos.add_attendance(req.body.email, req.body.date, req.body.course, req.body.image)
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  add_student,
  add_attendance
};
