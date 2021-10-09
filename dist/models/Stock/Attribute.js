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
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Item_Categories',
      key: 'id'
    }
  },
  position: {
    type: _sequelize["default"].DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  measurment: {
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

var Attribute = _mySQLDB["default"].define('Attributes', mappings, {
  indexes: [{
    name: 'attribute_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'attribute_item_id_index',
    method: 'BTREE',
    fields: ['item_id']
  }, {
    name: 'attribute_position_index',
    method: 'BTREE',
    fields: ['position']
  }, {
    name: 'attribute_name_index',
    method: 'BTREE',
    fields: ['name']
  }, {
    name: 'attribute_measurment_index',
    method: 'BTREE',
    fields: ['measurment']
  }, {
    name: 'attribute_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'attribute_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Attribute;
exports["default"] = _default;