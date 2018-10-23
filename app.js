const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const invitationAuth = require('./middleware/authentication').authenticated;
const staffRouter = require('./routes/staff');
const examRouter = require('./routes/exam');



//admin
const adminRouter = require('./routes/admin');

//Connect mongoose to our database
mongoose.connect(config.database.url);

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

const whitelist = ['http://localhost:3000','http://localhost:4200']
const corsOptions = {
  origin: function (origin, callback) {
    console.log('orig>>', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/staff', cors());
app.use('/staff', staffRouter);

app.use('/exam', invitationAuth);
app.use('/exam', examRouter);

//for admin
app.use('/admin',cors());
app.use('/admin', adminRouter);

app.use('/progress', cors(corsOptions));
app.use('/progress', invitationAuth);
app.use('/progress', (req, res, next) => {
  if(!req.user) return res.status(401).end('Unauthorized');
  next();
});
app.use('/progress', examRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
