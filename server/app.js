var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express')
var swaggerJSDoc = require('swagger-jsdoc')

const routes = require('./routes/')

var app = express();

// swagger
const swaggerDefinition = {
  info: {
    title: 'Team project API',
    version: '1.0.0',
    description: '',
  },
  //host: '13.125.149.206',
  host: 'localhost:80',
  basePath: '/',

  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'authorization',
      scheme: 'Bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  //apis: ['./teamProject/server/schemas/*.js'],
  apis: ['./server/schemas/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// view engine setup

//app.use(cors()) 
// cookie보낼때 클라이언트 (localhost:80)에서 cors error가 나는것 해결하는 과정, 자세히 알아보기 
// (withCredential, ...)
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
app.use('/api', routes)

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
