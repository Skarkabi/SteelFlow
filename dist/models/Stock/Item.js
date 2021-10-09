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

var _ItemAttributes = _interopRequireDefault(require("./ItemAttributes"));

var _Supplier = _interopRequireDefault(require("./Supplier"));

var mappings = {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cost: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  reserved: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  supplier_id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    references: {
      model: 'Suppliers',
      key: 'id'
    }
  },
  supplier_name: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.STRING, ['supplier_name'])
  },
  stock_attributes: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['attributes'])
  },
  item_category_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Item_Categories',
      key: 'id'
    }
  },
  item_category: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['category'])
  },
  invoice: {
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

var Item = _mySQLDB["default"].define('Stock_Items', mappings, {
  indexes: [{
    name: 'stock_item_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'stock_item_cost_index',
    method: 'BTREE',
    fields: ['cost']
  }, {
    name: 'stock_item_quantity_index',
    method: 'BTREE',
    fields: ['quantity']
  }, {
    name: 'stock_item_reserved_index',
    method: 'BTREE',
    fields: ['reserved']
  }, {
    name: 'stock_item_supplier_id_index',
    method: 'BTREE',
    fields: ['supplier_id']
  }, {
    name: 'stock_item_item_category_id_index',
    method: 'BTREE',
    fields: ['item_category_id']
  }, {
    name: 'stock_item_invoice_index',
    method: 'BTREE',
    fields: ['invoice']
  }, {
    name: 'stock_item_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'stock_item_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Item;
exports["default"] = _default;