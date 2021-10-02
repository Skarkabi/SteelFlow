"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv");

var _sequelize = _interopRequireDefault(require("sequelize"));

var dbName = 'steel_flow';
var dbUserName = 'root';
var dbPort = '3306';

var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var mySQLDB = new _sequelize["default"](dbName, dbUserName, process.env.DB_PASSWORD, {
  host: "localhost",
  port: dbPort,
  dialect: 'mysql'
});
mySQLDB.sync().then(function () {
  console.log("Database & tables created!");
})["catch"](function (err) {
  console.log("TESTT IS");
  console.log(process.env.DB_PASSWORD);
  console.log("Could not connect to database ".concat(err));
});
var _default = mySQLDB;
exports["default"] = _default;