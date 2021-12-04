import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import ItemAttribute from '../Stock/ItemAttributes';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    balance: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    production_quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    stock_quantity: {
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
    stock_items: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['stock_item'])
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
            name: 'items_production_quantity_index',
            method: 'BTREE',
            fields: ['production_quantity'],
        }, 
        {
            name: 'items_balance_index',
            method: 'BTREE',
            fields: ['balance'],
        }, 
        {
            name: 'items_stock_quantity_index',
            method: 'BTREE',
            fields: ['stock_quantity'],
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

/**
 * Funciton to add order item into system
 * @param {*} newOrderItem 
 * @returns 
 */
Item.createOrderItem = newOrderItems => {
    return new Bluebird((resolve, reject) => {
        Item.create(newOrderItems).then(created => {
            newOrderItems.attributes.map(attribute => {
                attribute.ProductionItemId = created.id
            })
            ItemAttribute.addItemAttributes(newOrderItems.attributes).then(() =>{
                resolve('Item added to order!');
            }).catch(err => {
                reject(err);
            });
            
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Funciton to retrieve specefic order item
 * @param {*} itemId 
 * @returns 
 */
Item.getOrderItemById = itemId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retreive all for speceified order
 * @param {*} orderId 
 * @returns 
 */
Item.getAllOrderItems = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to delete all items associated with order
 * @param {*} orderId 
 * @returns 
 */
Item.deleteAllOrderItems = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to delete specefic order item
 * @param {*} itemId 
 * @returns 
 */
Item.deleteOrderItem = itemId => {
    return new Bluebird((resolve, reject) => {

    });
}

export default Item;