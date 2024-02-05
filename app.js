const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

// Passport configuration
app.use(session({
    secret: 'admin105',
    resave: false,
    saveUninitialized: false
}));

// Import routes
const classRouter = require('./routes/routes');
app.use('/', classRouter);

// In-memory database implement your own database structure
const studentsList = [];

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (studentsList.some(student => student.email === email)) {
        res.status(400).send('Student with that email already exists');
    }

    const newStudent = {
        id: `CMS - ${Math.floor(10 + Math.random() * 5000)}`,
        email: email,
        password: password
    };

    studentsList.push(newStudent);
});

const { courses } = require('./views/courses/courses');

// Start application
const port = 4001;
app.listen(port, () => {
    console.log(`Server started listening at http://localhost:${port}/admin`);
});
