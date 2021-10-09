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

var _MaterialRequest = _interopRequireDefault(require("./MaterialRequest"));

var _User = _interopRequireDefault(require("../User/User"));

var mappings = {
  order_id: {
    type: _sequelize["default"].DataTypes.STRING,
    primaryKey: true
  },
  sales_eid: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  sales_mid: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  production_eid: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  production_mid: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  employees: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['employees'])
  },
  approved: {
    type: _sequelize["default"].DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  delivery_date: {
    type: _sequelize["default"].DataTypes.DATE,
    allowNull: true
  },
  priority: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  invoiced_amount: {
    type: _sequelize["default"].DataTypes.DOUBLE,
    allowNull: false
  },
  department: {
    type: _sequelize["default"].DataTypes.STRING,
    allowNull: false
  },
  items: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['items'])
  },
  material_requests: {
    type: _sequelize["default"].DataTypes.VIRTUAL(_sequelize["default"].DataTypes.JSON, ['material_requests'])
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

var Order = _mySQLDB["default"].define('Orders', mappings, {
  indexes: [{
    name: 'orders_order_id_index',
    method: 'BTREE',
    fields: ['order_id']
  }, {
    name: 'orders_sales_eid_index',
    method: 'BTREE',
    fields: ['sales_eid']
  }, {
    name: 'orders_sales_mid_index',
    method: 'BTREE',
    fields: ['sales_mid']
  }, {
    name: 'orders_production_eid_index',
    method: 'BTREE',
    fields: ['production_eid']
  }, {
    name: 'orders_production_mid_index',
    method: 'BTREE',
    fields: ['production_mid']
  }, {
    name: 'orders_approved_index',
    method: 'BTREE',
    fields: ['approved']
  }, {
    name: 'orders_delivery_date_index',
    method: 'BTREE',
    fields: ['delivery_date']
  }, {
    name: 'orders_priority_index',
    method: 'BTREE',
    fields: ['priority']
  }, {
    name: 'orders_status_index',
    method: 'BTREE',
    fields: ['status']
  }, {
    name: 'orders_invoiced_amount_index',
    method: 'BTREE',
    fields: ['invoiced_amount']
  }, {
    name: 'orders_department_index',
    method: 'BTREE',
    fields: ['department']
  }, {
    name: 'orders_createdAt_index',
    method: 'BTREE',
    fields: ['createdAt']
  }, {
    name: 'orders_updatedAt_index',
    method: 'BTREE',
    fields: ['updatedAt']
  }]
});

var _default = Order;
exports["default"] = _default;