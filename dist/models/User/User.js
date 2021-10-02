"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _mySQLDB = _interopRequireDefault(require("../../mySQLDB"));

var _Restrictions = _interopRequireDefault(require("./Restrictions"));

var mappings = {
  id: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  division: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  accountType: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  employees: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['employees'])
  },
  restrictions: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['restrictions'])
  },
  department: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: _sequelize["default"].DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: _sequelize["default"].DataTypes.DATE,
    allowNull: true
  }
};

var User = _mySQLDB["default"].define('Users', mappings, {
  indexes: [{
    name: 'user_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'user_password_index',
    method: 'BTREE',
    fields: ['password']
  }, {
    name: 'user_email_index',
    method: 'BTREE',
    fields: ['email']
  }, {
    name: 'user_firstName_index',
    method: 'BTREE',
    fields: ['firstName']
  }, {
    name: 'user_lastName_index',
    method: 'BTREE',
    fields: ['lastName']
  }, {
    name: 'user_jobTitle_index',
    method: 'BTREE',
    fields: ['jobTitle']
  }, {
    name: 'user_division_index',
    method: 'BTREE',
    fields: ['division']
  }, {
    name: 'user_accountType_index',
    method: 'BTREE',
    fields: ['accountType']
  }, {
    name: 'user_department_index',
    method: 'BTREE',
    fields: ['department']
  }, {
    name: 'user_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'user_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

User.hasOne(_Restrictions["default"]);
var _default = User;
exports["default"] = _default;