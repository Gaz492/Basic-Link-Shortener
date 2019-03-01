if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');

const config = require('./config/config');
require('./models/URLSchema');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
promise = mongoose.connect(config.mongodb.URI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
});

promise.then(() => {
    console.log('MongoDB Connected!');
});

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.engine('.hbs', handlebars({
    helpers: {
        ifCond: function (conditional, options) {
            if (options.hash.value === conditional) {
                return options.fn(this)
            } else {
                return options.inverse(this);
            }
        },
        ifNotCond: function (conditional, options) {
            if (options.hash.value !== conditional) {
                return options.fn(this)
            } else {
                return options.inverse(this);
            }
        }
    },
    extname: 'hbs',
    partialsDir: [path.join(__dirname, '/views/partials')]
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "fOrigin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
