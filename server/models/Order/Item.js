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
    total_order_quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false, 
        defaultValue: 0
    },
    production_quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    produced_quantity: {
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
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['stock_items'])
    },
    bom: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['bom'])
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
            name: 'items_produced_quantity_index',
            method: 'BTREE',
            fields: ['produced_quantity'],
        }, 
        {
            name: 'items_total_order_quantity_index',
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
    ],
    
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

function updateStockCount(reserve){
    return new Bluebird((resolve, reject) => {
        let stockQuant = reserve.quantity;
        if(reserve.production){
            stockQuant = 0;
        }
        Item.update(
            { 
                stock_quantity: sequelize.fn(`${stockQuant} + `, sequelize.col('stock_quantity')),
                balance: sequelize.fn(`${reserve.quantity} + `, sequelize.col('balance'))
            },

            { where: { id: reserve.ProductionItemId} } 
        ).then(() => {
            resolve("Updated")
        }).catch(err => {
            reject(err);
        })
    })
}

Item.startProduction = (received) => {
    return new Bluebird((resolve, reject) => {
        let startQuant = 0
        let finishQuant = 0
        if(received.startQuant !== ''){
            startQuant =  parseFloat(parseFloat(received.startQuant).toFixed(2));
        }

        if(received.finishQuant !== ''){
            finishQuant =  parseFloat(parseFloat(received.finishQuant).toFixed(2));
        }
        startQuant = startQuant - finishQuant;
        Item.findOne({
            where: { id: received.id }
        }).then(found => {
            found.production_quantity = startQuant + found.production_quantity;
            found.produced_quantity = finishQuant + found.produced_quantity;
            found.balance = finishQuant + found.balance;

            if(found.production_quantity !== 0){
                
                found.status = "In Progress"
            }
            if(found.total_order_quantity === found.balance){
                found.status = "Completed"

            }
            found.save().then(() => {
                resolve("Updated")

            }).catch(err => {
                reject(err);

            })

        })
        
    })
    
}

Item.reserveItem = (reserves) => {
    return new Bluebird.each(reserves, updateStockCount).then(output => {
        
        return output;
    })
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