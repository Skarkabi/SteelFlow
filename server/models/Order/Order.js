import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Item from './Item';
import MaterialRequest from './MaterialRequest';
import User from '../User/User';

const mappings = {
    order_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    sales_eid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    sales_mid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    production_eid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    production_mid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    approved: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    delivery_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    priority: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    invoiced_amount: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    items:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['items']),
    },
    material_requests:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['material_requests']),
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    }
}

const Order = sequelize.define('Orders', mappings, {
    indexes: [
        {
            name: 'orders_order_id_index',
            method: 'BTREE',
            fields: ['order_id'],
        },
        {
            name: 'orders_sales_eid_index',
            method: 'BTREE',
            fields: ['sales_eid'],
        },
        {
            name: 'orders_sales_mid_index',
            method: 'BTREE',
            fields: ['sales_mid'],
        },
        {
            name: 'orders_production_eid_index',
            method: 'BTREE',
            fields: ['production_eid'],
        },
        {
            name: 'orders_production_mid_index',
            method: 'BTREE',
            fields: ['production_mid'],
        },
        {
            name: 'orders_approved_index',
            method: 'BTREE',
            fields: ['approved'],
        },
        {
            name: 'orders_delivery_date_index',
            method: 'BTREE',
            fields: ['delivery_date'],
        },
        {
            name: 'orders_priority_index',
            method: 'BTREE',
            fields: ['priority'],
        },
        {
            name: 'orders_status_index',
            method: 'BTREE',
            fields: ['status'],
        },
        {
            name: 'orders_invoiced_amount_index',
            method: 'BTREE',
            fields: ['invoiced_amount'],
        },
        {
            name: 'orders_department_index',
            method: 'BTREE',
            fields: ['department'],
        },
        {
            name: 'orders_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        },
        {
            name: 'orders_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        }
    ]
});

export default Order;