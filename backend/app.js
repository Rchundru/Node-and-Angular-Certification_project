var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var User = require('./models/userModel');

var passport = require('passport');
var LocalStrategy = require('passport-local');
passportLocalMongoose = require('passport-local-mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminProductRouter = require('./routes/admin_products')
var consumerProductRouter = require('./routes/consumer_products')

var app = express();

var corsOptions = {
  origin: ['http://localhost:4200']
};
app.use(cors(corsOptions));

// Connect to Database
mongoose.connect('mongodb://localhost:27017/edurekadb',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to Database!!') })
  .catch((error) => { console.log(error) });

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 1000
  }
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
})
//MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/products', adminProductRouter);
app.use('/products', consumerProductRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;
