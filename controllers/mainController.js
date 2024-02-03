module.exports = {
    getDashboardPage: (req, res) => {
        res.render('dashboard.ejs');
    },
    getLoginPage: (req, res) => {
        res.render('login.ejs');
    },
    getRegisterPage: (req, res) => {
        res.render('register.ejs');
    },
    getAddStudentForm: (req, res) => {
        res.render('addStudent.ejs');
    },
    getEnrollCourseForm: (req, res) => {
        res.render('enroll-course.ejs')
    }
}