const express = require('express');
const app = express();
const userRoute = require('./router/useRouter');
require('dotenv').config();
const cors = require('cors');
const ejs = require('ejs');
const passport=require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wuakpfi.mongodb.net/Authentication`,
    collectionName:'session'// See below for details
  })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Define your routes before the error-handling middleware
app.use('/user/route', userRoute);

app.get('/', (req, res, next) => {
    res.render('index');
});

// Error-handling middleware
app.use((req, res, next) => {
    res.status(404).send('Not found page');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error! Something is broken');
});

module.exports = app;
