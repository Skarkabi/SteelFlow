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
  attribute_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Attributes',
      key: 'id'
    }
  },
  attribute: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['attribute'])
  },
  item_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Stock_Items',
      key: 'id'
    }
  },
  unit: {
    type: _sequelize["default"].DataTypes.DOUBLE,
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

var ItemAttribute = _mySQLDB["default"].define('Item_Attributes', mappings, {
  indexes: [{
    name: 'item_attribute_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'item_attribute_attribute_id_index',
    method: 'BTREE',
    fields: ['attribute_id']
  }, {
    name: 'item_attribute_item_id_index',
    method: 'BTREE',
    fields: ['item_id']
  }, {
    name: 'item_attribute_unit_index',
    method: 'BTREE',
    fields: ['unit']
  }, {
    name: 'item_attribute_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'item_attribute_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = ItemAttribute;
exports["default"] = _default;