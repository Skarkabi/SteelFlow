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

var _User = _interopRequireDefault(require("./User"));

var mappings = {
  mId: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  eId: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
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

var WorkFor = _mySQLDB["default"].define('Work_For', mappings, {
  indexes: [{
    name: 'work_for_mId_index',
    method: 'BTREE',
    fields: ['mId']
  }, {
    name: 'work_for_eId_index',
    method: 'BTREE',
    fields: ['eId']
  }, {
    name: 'work_for_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'work_for_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = WorkFor;
exports["default"] = _default;