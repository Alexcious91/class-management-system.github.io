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
app.use(session({ secret: 'admin101', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

// Import routes
const classRouter = require('./routes/routes');

app.use('/', classRouter);

// In-memory database implement your own database structure
const studentsList = [];

app.post('/register', (req, res) => {
    const emailRegex = '@';
    const { name, email, password } = req.body;

    if (!email.match(emailRegex)) {
        res.render('/register.ejs', { message: 'Please enter the correct email.' })
    } else {
        studentsList.push({
            name: name,
            email: email,
            password: password
        });
        console.log(studentsList);
        res.redirect('/dashboard')
    }

});

const { courses } = require('./views/courses/courses');

// Start application
const port = 4001;
app.listen(port, () => {
    console.log(`Server started listening at http://localhost:${port}/admin`);
});
