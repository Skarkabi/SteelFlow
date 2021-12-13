import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Item from './Item';
import RequestedItem from './RequestedItem';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    materialRequestNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
            name: 'material_request_materialRequestNumber_index',
            method: 'BTREE',
            fields: ['materialRequestNumber'],
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

function checkFinished(id){
    return new Bluebird((resolve, reject) => {
        MaterialRequest.findOne({
            where: {
                id: id
            },
            include: [RequestedItem]
        }).then(materialRequest => {
            resolve(true);
        })
    })
}
/**
 * Function to add material request into system
 * @param {*} newMaterialRequest 
 * @returns 
 */
MaterialRequest.createMaterialRequest = newMaterialRequest => {
    return new Bluebird((resolve, reject) => {
        getLastMaterialRequestNumber().then(number => {
            newMaterialRequest.materialRequestNumber = number;
            MaterialRequest.create(newMaterialRequest).then(created => {
                newMaterialRequest.items.map(item => {
                    item.MaterialRequestId = created.id
                })
                RequestedItem.addItem(newMaterialRequest.items).then(() => {
                    Item.findOne({
                        where:{
                            id: newMaterialRequest.ProductionItemId
                        }
                    }).then(orderItem => {
                        orderItem.status = "Pending Material";
                        orderItem.save().then(() => {
                            resolve(`Material request ${newMaterialRequest.id} has been added in the system!`)
                        }).catch(err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                    
                }).catch(err => {
                    reject(err);
                })
                
            }).catch(err => {
                console.log("This Error")
                reject(err);
            })
        }).catch(err => {
            console.log("Next Error")
            reject(err);
        })

    })
}

function getLastMaterialRequestNumber (){
    return new Bluebird((resolve, reject) => {
        MaterialRequest.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        }).then(found => {
            if(!found){
                resolve(10001);
            }
            const materialRequestNumber = parseInt(found.materialRequestNumber) + 1
            resolve(materialRequestNumber);
        }).catch(err => {
            reject(err)
        });
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
