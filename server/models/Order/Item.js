import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.DataTypes.STRING,
        references:{
            model: 'Orders',
            key: 'order_id'
        }
    },
    production_or_stock: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
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

const Item = sequelize.define('Production_Items', mappings, {
    indexes: [
        {
            name: 'items_id_index',
            method: 'BTREE',
            fields: ['id'],
        }, 
        {
            name: 'items_order_id_index',
            method: 'BTREE',
            fields: ['order_id'],
        }, 
        {
            name: 'items_production_or_stock_index',
            method: 'BTREE',
            fields: ['production_or_stock'],
        }, 
        {
            name: 'items_balance_index',
            method: 'BTREE',
            fields: ['balance'],
        }, 
        {
            name: 'items_quantity_index',
            method: 'BTREE',
            fields: ['quantity'],
        }, 
        {
            name: 'items_status_index',
            method: 'BTREE',
            fields: ['status'],
        }, 
        {
            name: 'items_cost_index',
            method: 'BTREE',
            fields: ['cost'],
        }, 
        {
            name: 'items_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        }, 
        {
            name: 'items_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        }, 
    ]
})

export default Item;