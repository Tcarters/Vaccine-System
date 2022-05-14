var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const appRoute = require('./src/routes');


// var indexRouter = require('./src/routes/index');
// var usersRouter = require('./src/routes/users');

var app = express();

app.use( cors() )
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', appRoute);
// app.use('/users', usersRouter);

module.exports = app;
