"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _mySQLDB = _interopRequireDefault(require("../../mySQLDB"));

var mappings = {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false,
    defaultValue: "N/A"
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

var Supplier = _mySQLDB["default"].define('Suppliers', mappings, {
  indexes: [{
    name: 'supplier_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'supplier_name_index',
    method: 'BTREE',
    fields: ['name']
  }, {
    name: 'supplier_email_index',
    method: 'BTREE',
    fields: ['email']
  }, {
    name: 'supplier_phone_index',
    method: 'BTREE',
    fields: ['phone']
  }, {
    name: 'supplier_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'supplier_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Supplier;
exports["default"] = _default;