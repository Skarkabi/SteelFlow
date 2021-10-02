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
  category_id: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Item_Categories',
      key: 'id'
    }
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
  attribute_unit: {
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

var Bom = _mySQLDB["default"].define('Boms', mappings, {
  indexes: [{
    name: 'bom_id_index',
    method: 'BTREE',
    fields: ['id']
  }, {
    name: 'bom_category_id_index',
    method: 'BTREE',
    fields: ['category_id']
  }, {
    name: 'bom_attribute_id_index',
    method: 'BTREE',
    fields: ['attribute_id']
  }, {
    name: 'bom_attribute_unit_index',
    method: 'BTREE',
    fields: ['attribute_unit']
  }, {
    name: 'bom_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'bom_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Bom;
exports["default"] = _default;