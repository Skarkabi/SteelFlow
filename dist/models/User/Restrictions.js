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
  user_id: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  view_users: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  edit_users: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  view_production: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  edit_production: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  view_stock: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  edit_stock: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  view_material_request: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  edit_material_request: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false
  },
  request_production: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
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

var Restrictions = _mySQLDB["default"].define('Restrictions', mappings, {
  indexes: [{
    name: 'restrictions_user_id_index',
    method: 'BTREE',
    fields: ['user_id']
  }, {
    name: 'restrictions_view_users_index',
    method: 'BTREE',
    fields: ['view_users']
  }, {
    name: 'restrictions_edit_users_index',
    method: 'BTREE',
    fields: ['edit_users']
  }, {
    name: 'restrictions_view_production_index',
    method: 'BTREE',
    fields: ['view_production']
  }, {
    name: 'restrictions_edit_production_index',
    method: 'BTREE',
    fields: ['edit_production']
  }, {
    name: 'restrictions_view_stock_index',
    method: 'BTREE',
    fields: ['view_stock']
  }, {
    name: 'restrictions_edit_stock_index',
    method: 'BTREE',
    fields: ['edit_stock']
  }, {
    name: 'restrictions_view_material_request_index',
    method: 'BTREE',
    fields: ['view_material_request']
  }, {
    name: 'restrictions_edit_material_request_index',
    method: 'BTREE',
    fields: ['edit_material_request']
  }, {
    name: 'restrictions_request_production_index',
    method: 'BTREE',
    fields: ['request_production']
  }, {
    name: 'restrictions_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'restrictions_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Restrictions;
exports["default"] = _default;