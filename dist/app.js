"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _connectSessionSequelize = _interopRequireDefault(require("connect-session-sequelize"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport2 = _interopRequireDefault(require("./passport"));

var _mySQLDB = _interopRequireDefault(require("./mySQLDB"));

var _expressBreadcrumbs = _interopRequireDefault(require("express-breadcrumbs"));

var _allowPrototypeAccess = require("@handlebars/allow-prototype-access");

require('./models/Session');

require('dotenv').config;

require('./models/User/User');

require('./models/Order/Order');

require('./models/Stock/ItemCategory');

require('./models/Stock/Item');

var app = (0, _express["default"])();
var multiHelpers = (0, _handlebarsHelpers["default"])(); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.engine('hbs', (0, _expressHandlebars["default"])({
  helpers: multiHelpers,
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/',
  handlebars: (0, _allowPrototypeAccess.allowInsecurePrototypeAccess)(_handlebars["default"])
}));
app.set('view engine', 'hbs');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
var SequelizeStore = (0, _connectSessionSequelize["default"])(_expressSession["default"].Store);
app.use((0, _expressSession["default"])({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120 * 60 * 1000
  },
  store: new SequelizeStore({
    db: _mySQLDB["default"],
    table: 'Session'
  })
}));
app.use((0, _expressFlash["default"])());
app.use(function (req, res, next) {
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});
(0, _passport2["default"])(_passport["default"]);
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(function (req, res, next) {
  app.locals.user = req.user;
  next();
});
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.validation_error_msg = req.flash('validation_error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(_expressBreadcrumbs["default"].init());
app.use(_expressBreadcrumbs["default"].setHome({
  name: 'Dashboard',
  url: '/'
}));
app.use('/bootstrap', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/jquery/dist')));
app.use('/file-saver', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/file-saver/dist')));
app.use('/xlsx', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/xlsx/dist')));
app.use('/exceljs', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/exceljs/dist')));
app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
});
/**
 * Error handler
 */

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var _default = app;
exports["default"] = _default;