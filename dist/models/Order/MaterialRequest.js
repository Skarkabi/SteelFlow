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

var _Item = _interopRequireDefault(require("./Item"));

var mappings = {
  id: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true
  },
  order_id: {
    type: _sequelize["default"].DataTypes.STRING,
    references: {
      model: 'Orders',
      key: 'order_id'
    }
  },
  item_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Production_Items',
      key: 'id'
    }
  },
  invoice: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    defaultValue: "N/A"
  },
  items: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['items'])
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

var MaterialRequest = _mySQLDB["default"].define('Material_Requests', mappings, {
  indexes: [{
    name: 'material_request_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'material_request_order_id_index',
    method: 'BTREE',
    fields: ['order_id']
  }, {
    name: 'material_request_item_id_index',
    method: 'BTREE',
    fields: ['item_id']
  }, {
    name: 'material_request_invoice_index',
    method: 'BTREE',
    fields: ['invoice']
  }, {
    name: 'material_request_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'material_request_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

MaterialRequest.hasMany(_Item["default"], {
  constraints: false
});
var _default = MaterialRequest;
exports["default"] = _default;