import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Item from './Item';

const mappings = {
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.DataTypes.STRING,
        references:{
            model: 'Orders',
            key: 'order_id'
        }
    },
    item_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Production_Items',
            key: 'id'
        }
    },
    invoice: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
    item: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['item'])
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

const MaterialRequest = sequelize.define('Material_Requests', mappings, {
    indexes: [
        {
            name: 'material_request_id_index',
            method: 'BTREE',
            fields: ['id'],
        }, 
        {
            name: 'material_request_order_id_index',
            method: 'BTREE',
            fields: ['order_id'],
        }, 
        {
            name: 'material_request_item_id_index',
            method: 'BTREE',
            fields: ['item_id'],
        }, 
        {
            name: 'material_request_invoice_index',
            method: 'BTREE',
            fields: ['invoice'],
        }, 
        {
            name: 'material_request_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        }, 
        {
            name: 'material_request_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        }, 
    ]
});

/**
 * Function to add material request into system
 * @param {*} newMaterialRequest 
 * @returns 
 */
MaterialRequest.createMaterialRequest = newMaterialRequest => {
    return new Bluebird((resolve, reject) => {
        MaterialRequest.create(newMaterialRequest).then(() => {
            resolve(`Material request ${newMaterialRequest.id} has been added in the system!`)
        }).catch(err => {
            reject(err);
        })

    })
}

/**
 * Function to retreieve specefic material request
 * @param {*} materialId 
 * @returns 
 */
MaterialRequest.getOrderMaterialRequestById = materialId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retrieve all material requests associated with specfied order
 * @param {*} orderId 
 * @returns 
 */
MaterialRequest.getAllOrderMaterialRequests = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to delete all material requests associated with order
 * @param {*} orderId 
 * @returns 
 */
MaterialRequest.deleteAllOrderMaterialRequests = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to delete specefic order material request
 * @param {*} materialId 
 * @returns 
 */
MaterialRequest.deleteMaterialRequest = materialId => {
    return new Bluebird((resolve, reject) => {

    });
}


export default MaterialRequest;
