//checks if we're running in our process environment or not
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//required libraries
const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts')
const parser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//port
const PORT = process.env.PORT || 3000;

//Passport login configuration
require('./config/passport')(passport);

//setting our view layout and directory
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({extended:false})) //new

//setting up layout files for pages
app.set('layout', 'pages/layouts')
app.use(layouts)
app.use(express.static('public')) //public views fall under this folder

//Bodyparser
app.use(parser.urlencoded({limit: '10mb', extended: false}))



//Express Session (middleware)
app.use(session({
    secret: 'Wedge',
    resave: true,
    saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash());

//Global Variable
app.use((req,res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//setting up routes to our index
const index = require('./routes/index')
app.use('/', index)

//User route
const users = require('./routes/users')
app.use('/users', users)

//setting up route to our activities page
const task = require('./routes/tasks')
app.use('/tasks', task)

//setting up route to our events page
const event = require('./routes/events')
app.use('/events', event)

const calendar = require('./routes/calendar')
app.use('/calendar', calendar)

// //route for upload page
// const upload = require('./routes/upload')
// app.use('/upload', upload);

// app.get("/upload", (req, res) =>
// {
//     res.render("upload.ejs");
// })

//process.env.URL

//setting up our database (mongodb)
const mongoose = require('mongoose')
const res = require('express/lib/response')
mongoose.connect('mongodb://127.0.0.1', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error)) //messages so we know if we have connected
db.once('open', () => console.log('successfully connected to mongoose'))

//app.listen(process.env.PORT || 3000) //the port we are going to use

app.listen(PORT, console.log('Server started on port ${PORT}'))

app.get('/login', (req, res)=> {
    res.render('login.ejs') //new
})
app.get('/register', (req, res)=> {
    res.render('register.ejs') //new
})


//const express = require('express');
//const router = express.Router();

/*
//CODE FOR UPLOAD PAGE
*/
const multer = require("multer");
//for unique id's for same name files
const uuid = require('uuid').v4;
const path = require('path');
const Text = require('./models/text')

//defines the destination for the uploaded file and
//how it will be named.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `studentFiles/${id}${ext}`;
        Text.create({ filePath: filePath })
            .then(() => {
                cb(null, filePath)
            });
    }
})

const upload = multer({storage});
const fs = require('fs');

const { DESTRUCTION } = require('dns')
//const app = express();

app.get('/upload', (request, response) => 
{
    response.render("upload")
});





app.post('/upload', upload.single('doc'), (req,res) =>
{
    return res.json({status: "OK"});
});

app.get('/studentFiles', (req, res) => {
    Text.find()
        .then((images) => {
            return res.json({ status: 'OK', images});
        })
});

app.listen(3003, () => console.log('App is listening...'))


// //MONGOOSE FOR FILETYPE SCHEMAS
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const textSchema = new Schema
// (
//     {
//         filePath:String,
//     },
//     {
//         timestamps: true,
//     },
// );

// const moduleFile = mongoose.model('text', textSchema);

// module.exports = moduleFile;
// //module.exports = router;
