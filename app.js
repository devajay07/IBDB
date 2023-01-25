const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRoute');
const authRouter = require('./routes/userRoute');
const appError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

const limiter = rateLimit({
    max:200,
    windowMs: 60*60*1000,
    message: "Too many requests from same ip, please try in an hour!!"
})

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', limiter)

// app.router = express.Router();

app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/index',(req,res)=>{
    res.render('index');
})

app.use('/api/v1/books',bookRouter);
app.use('/api/v1/users',authRouter);

app.all('*', (req,res,next)=>{

    next(new appError(`failed to find ${req.originalUrl}`,404));

})

app.use(errorController);



module.exports = app;
