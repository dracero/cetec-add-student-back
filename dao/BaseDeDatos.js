var attendance = require("../models/attendance.js");
var student = require("../models/student.js");

class ErrorEmailAlreadyExists extends Error {
    constructor() {
        super();
        this.name = 'Error: ya existe un usuario con el mismo email.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class BaseDeDatos {

    constructor(){
        this.attendanceModel = attendance;
        this.studentModel = student;
    }

    async student_email_exists(email) {
        return this.studentModel
                    .findOne({ email: email })
                    .select("email")
                    .lean()
                    .then(result => {
                        console.log(result);
                        return result != null;
                    });
    }

    async attendance_email_exists(email) {
        return this.attendanceModel
                    .findOne({ email: email })
                    .select("email")
                    .lean()
                    .then(result => {
                        console.log(result);
                        return result != null;
                    });
    }

    async add_student(email, name, image) {
        if (await this.student_email_exists(email)){
            console.log("Error: " + email + " ya existe.");
            throw new ErrorEmailAlreadyExists();
        }
        
        console.log("Alumno nuevo, se agrega a la lista.");
        const obj = JSON.stringify({email: email, name: name, image:image});
        const student_structure = new this.studentModel(JSON.parse(obj));
        student_structure.save();
        return student_structure;
    }

    async add_attendance(email, date, course, image) {
        if (await this.attendance_email_exists(email)){
            console.log("Error: " + email + " ya existe.");
            throw new ErrorEmailAlreadyExists();
        }
        
        console.log("Asistencia nueva, se agrega a la lista.");
        const obj = JSON.stringify({email: email, date: date, course: course, image:image});
        const attendance_structure = new this.attendanceModel(JSON.parse(obj));
        attendance_structure.save();
        return attendance_structure;
    }
}

module.exports = BaseDeDatos;
