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
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: _sequelize["default"].DataTypes.STRING,
    references: {
      model: 'Orders',
      key: 'order_id'
    }
  },
  production_or_stock: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
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

var Item = _mySQLDB["default"].define('Production_Items', mappings, {
  indexes: [{
    name: 'items_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'items_order_id_index',
    method: 'BTREE',
    fields: ['order_id']
  }, {
    name: 'items_production_or_stock_index',
    method: 'BTREE',
    fields: ['production_or_stock']
  }, {
    name: 'items_balance_index',
    method: 'BTREE',
    fields: ['balance']
  }, {
    name: 'items_quantity_index',
    method: 'BTREE',
    fields: ['quantity']
  }, {
    name: 'items_status_index',
    method: 'BTREE',
    fields: ['status']
  }, {
    name: 'items_cost_index',
    method: 'BTREE',
    fields: ['cost']
  }, {
    name: 'items_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'items_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Item;
exports["default"] = _default;