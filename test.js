const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.urlencoded({ extended: true}));

class SchoolCatalog {
    constructor(name, codename) {
        this.name = name;
        this.codename = codename;
        this.students = [];
        this.courses = [
            {
                name: "Programming",
                codename: "PROG101"
            }, 
            {
                name: "Mathematics",
                codename: "MATH205"
            }
        ]
    }
    
    addStudent(studentName, studentEmail, selectedCourse) {
        this.students.push({
            id: `#${Math.floor(1 + Math.random() * 8000)}`,
            name: studentName,
            email: studentEmail,
            enrollCourse: selectedCourse
        });
    }
    
    getStudents() {
        console.log('\nEnrolled Students:');
        if (this.students.length === 0) {
            console.log('- No students enrolled')
        } else {
            
            this.students.forEach(student => {
                const enrolledCourse = this.courses.find(course => course.codename === student.enrollCourse)

                console.log(`Student No: ${student.id} Student Name: ${student.name} -- Enrolled Course: ${enrolledCourse ? enrolledCourse.codename : "Unknown"}`)
            });
        }
    }
    
    getCourses() {
        console.log('Available Courses:')
        this.courses.forEach(course => {
            console.log(`Course Name: "${course.name}", Codename: "${course.codename}"`)
        })
    }
}

const catalog = new SchoolCatalog();

catalog.getCourses();

app.get('/catalog', (req, res) => {
    res.render('test');
});

app.post('/enrollCourse', (req, res) => {
    const { name, email, selectedCourse } = req.body;
    const emailRegex = '@';

    const emailExists = catalog.students.some(student => student.email === email);

    if (!email.includes(emailRegex)) {
        res.send('Invalid email \n', new Error('Invalid email'))
    } else if (emailExists) {
        res.send('Someone is already using that email')
    } else {
        catalog.addStudent(name, email, selectedCourse)
        catalog.getStudents();
        res.send('Student enrolled.');
    }

});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started listening at http://localhost:${port}/catalog`);
});