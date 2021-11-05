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
    approved: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

/**
 * Function to retrieve all orders in system
 * @returns 
 */
Order.getAllOrders = () => {
    return new Bluebird((resolve, reject) => {
        Order.findAll().then(orders => {
            resolve(orders);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Function to retreive last order Id in system
 * @returns 
 */
Order.getLastOrderId = () => {
    return new Bluebird((resolve, reject) => {

    })
}

/**
 * Function to retrieve specific order in system
 * @param {*} orderId 
 * @returns 
 */
Order.getOrderById = orderId => {
    return new Bluebird((resolve, reject) => {
        
    });
}

/**
 * Function to delete specefied order in system
 * @param {*} orderId 
 * @returns 
 */
Order.deleteOrder = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to update order in system
 * @param {*} order 
 * @returns 
 */
Order.updateOrder = order => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to set approvel status of order
 * @param {*} orderId 
 * @param {*} approved 
 * @returns 
 */
Order.setApproved = (orderId, approved) => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to set all material requests for specefied order
 * @param {*} orderId 
 * @returns 
 */
function getMaterialRequests(orderId){
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to set all items needed for specefied order
 * @param {*} orderId 
 * @returns 
 */
function getOrderItems(orderId){
    return new Bluebird((resolve, reject) => {

    })
}

export default Order;