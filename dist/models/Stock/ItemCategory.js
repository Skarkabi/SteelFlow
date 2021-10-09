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

var _Attribute = _interopRequireDefault(require("./Attribute"));

var _Bom = _interopRequireDefault(require("./Bom"));

var mappings = {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  bom: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['bom'])
  },
  name: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  attribute_amount: {
    type: _sequelize["default"].DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  attributes: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['attributes'])
  },
  quantity_unit: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pieces"
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

var ItemCategory = _mySQLDB["default"].define('Item_Categories', mappings, {
  indexes: [{
    name: 'item_category_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'item_category_type_index',
    method: 'BTREE',
    fields: ['type']
  }, {
    name: 'item_category_name_index',
    method: 'BTREE',
    fields: ['name']
  }, {
    name: 'item_category_attribute_amount_index',
    method: 'BTREE',
    fields: ['attribute_amount']
  }, {
    name: 'item_category_quantity_unit_index',
    method: 'BTREE',
    fields: ['quantity_unit']
  }, {
    name: 'item_category_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'item_category_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = ItemCategory;
exports["default"] = _default;