import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import ItemAttribute from '../Stock/ItemAttributes';
import Attribute from '../Stock/Attribute';
import Supplier from '../Stock/Supplier';
import ItemCategory from '../Stock/ItemCategory';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemPosition: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    cost: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    received: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    details: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, ['details'])
    },
    name: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, ['name'])
    },
    invoice: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    
}

const Item = sequelize.define('Requested_Items', mappings, {
    indexes: [
        {
            name: 'requested_item_id_index',
            method: 'BTREE',
            fields: ['id'], 
        },
        {
            name: 'requested_item_itemPosition_index',
            method: 'BTREE',
            fields: ['itemPosition'], 
        },
        {
            name: 'requested_item_cost_index',
            method: 'BTREE',
            fields: ['cost'], 
        },
        {
            name: 'requested_item_quantity_index',
            method: 'BTREE',
            fields: ['quantity'], 
        },
        {
            name: 'requested_item_received_index',
            method: 'BTREE',
            fields: ['received'], 
        },
        {
            name: 'requested_item_invoice_index',
            method: 'BTREE',
            fields: ['invoice'], 
        },
        {
            name: 'requested_item_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },
        {
            name: 'requested_item_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        }
    ]
});

Item.addItem = newItems => {
    return new Bluebird((resolve, reject) => {
        Item.bulkCreate(newItems).then(createdItems => {
            newItems.map(newItem => {
                console.log(newItem);
                console.log(createdItems[0])
                const matchingItem = createdItems.find(createdItem => {
                    return (
                        createdItem.MaterialRequestId === newItem.MaterialRequestId &&
                        createdItem.itemPosition === parseInt(newItem.itemPosition)
                    )
                })
                console.log(matchingItem)
                if(matchingItem){
                    newItem.itemAttributes.map(attribute => {
                        attribute.RequestedItemId = matchingItem.id
                        console.log(attribute)
                    })
                }
                
           
            })

            new Bluebird.each(newItems, function(item){
                return new Bluebird((resolve, reject) => {
                    ItemAttribute.addItemAttributes(item.itemAttributes).then(() => {
                        resolve("Item Added To Stock");
                    }).catch(err => {
                        reject(err);
                    })
                })
            }).then(() => {
                resolve("Items Requested")
            }).catch(err => {
                reject(err);
            })
           
            
        }).catch(err => {
            reject(err);
        })
    })
}

Item.receiveItem = items => {
    return new Bluebird.each(items, function(item){
        return new Bluebird((resolve,reject) => {
            let id = null;
            if(item.id !== ''){
                id =  parseInt(item.id)
            }
            Item.findOne({
                where: {
                    id: id
                }
            }).then(found => {
                if(found){
                    console.log(item)
                    console.log(`Updateding`)
                    console.log(typeof found.received);
                    console.log(parseFloat(parseFloat(item.received).toFixed(2)));
                    console.log((found.received) + parseFloat(parseFloat(item.received).toFixed(2)))
                    found.received = (found.received) + parseFloat(parseFloat(item.received).toFixed(2))
                    found.save().then(() => {
                        resolve("Updated")
                    }).catch(err => {
                        reject(`Could not update Item ${err}`)
                    })
                }else{
                    resolve("Nothing to update");
                }
                
            }).catch(err => {
                reject(`Could not Find Item ${err}`)
            })
        })
    })
}

export default Item