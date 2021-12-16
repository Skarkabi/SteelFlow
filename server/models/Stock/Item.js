import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import ItemAttribute from './ItemAttributes';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

    reserved: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },

    supplier_name: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, ['supplier_name'])
    },

    stock_attributes: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['stock_attributes'])
    },

    item_category: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['item_category'])
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

const Item = sequelize.define('Stock_Items', mappings, {
    indexes: [
        {
            name: 'stock_item_id_index',
            method: 'BTREE',
            fields: ['id'], 
        },

        {
            name: 'stock_item_cost_index',
            method: 'BTREE',
            fields: ['cost'], 
        },

        {
            name: 'stock_item_quantity_index',
            method: 'BTREE',
            fields: ['quantity'], 
        },

        {
            name: 'stock_item_reserved_index',
            method: 'BTREE',
            fields: ['reserved'], 
        },

        {
            name: 'stock_item_invoice_index',
            method: 'BTREE',
            fields: ['invoice'], 
        },

        {
            name: 'stock_item_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },

        {
            name: 'stock_item_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        }

    ]

});

Item.createItem = newItem => {
    return new Bluebird((resolve, reject) => {
        Item.findAll({
            where: {
                ItemCategoryId: newItem.ItemCategoryId,
                cost: newItem.cost
            },

            include: [
                {model: ItemAttribute, attributes: ["unit", "AttributeId", "ProductionItemId"], raw: true}
            ],

        }).then(found => {
            let updateItem = null
            if(found){
                found.map(item => {
                    let foundAttributes = 0;
                    item.Item_Attributes.map(attribute => {
                        const foundItem = newItem.itemAttributes.find(attr => {
                            const attObj = attribute.get({plainText: true});
                            return (JSON.stringify(attObj.unit) === attr.unit && JSON.stringify(attObj.AttributeId) === attr.AttributeId);

                        })

                        if(foundItem){
                            foundAttributes = foundAttributes + 1
                        
                        }

                    })

                    if(foundAttributes === item.Item_Attributes.length){
                        updateItem = item

                    }
                    
                })

            }
            
            if(updateItem){
                updateItem.quantity = updateItem.quantity + newItem.quantity;
                updateItem.save().then(() => {
                    resolve("Item Added To Stock");

                }).catch(err => {
                    reject(err);

                })

            }else{
                Item.create(newItem).then(createdItem => {
                    newItem.itemAttributes.map(attribute => {
                        attribute.StockItemId = createdItem.id

                    });

                    ItemAttribute.addItemAttributes(newItem.itemAttributes).then(() => {
                        resolve("Item Added To Stock");

                    }).catch(err => {
                        createdItem.destroy().then(() => {
                            reject("An Error Occured Item Could not be added")
                        
                        }).catch(err => {
                            reject(err);

                        });

                        reject(err);
                    
                    });
                    
                }).catch(err => {
                    reject(err);
                
                });
            
            }
        
        }).catch(err => {
            reject(err);
        
        })
    
    })

}

Item.getStock = itemCategory => {
    return new Bluebird((resolve, reject) => {
        Item.findAll({
            where: {
                ItemCategoryId: itemCategory
            },
            
            include: [
                {model: ItemAttribute}
            ]

        }).then(items => {
            resolve(items)

        }).catch(err => {
            reject(err);

        })

    })

}

Item.getStockForProduction = item => {
    return new Bluebird((resolve, reject) => {
        Item.findAll({
            where: {
                ItemCategoryId: item.ItemCategoryId
            },

            include: [
                {model: ItemAttribute}
            ],

        }).then(items => {
            let itemsToReturn = [];
            items.map(stockItem => {
                let stockAttributes = new Map();
                stockItem.Item_Attributes.map(attribute => {
                    stockAttributes.set(attribute.AttributeId, attribute.unit);
                })

                let matching = 0;
                item.Item_Attributes.map(produce => {
                    if(stockAttributes.get(produce.AttributeId) === produce.unit){
                        matching++

                    }

                })

                if(matching === item.Item_Attributes.length){
                    itemsToReturn.push(stockItem);

                }
                
            })

            resolve(itemsToReturn);
            
        }).catch(err => {
            reject(err);

        })

    })

}

function updateReserve(reserve){
    return new Bluebird((resolve, reject) => {
        console.log(reserve)
        console.log(parseFloat(parseFloat(reserve.quantity).toFixed(2)))
        Item.update(
            { quantity: sequelize.literal(`quantity - ${parseFloat(parseFloat(reserve.quantity).toFixed(2))}`)},
            { where: {id: reserve.StockItemId} }

        ).then(() => {
            resolve ("Updated")

        }).catch(err => {
            reject(err);

        })
    
    })
        
}

Item.reserveItem = (reserves) => {
    return new Bluebird.each(reserves, updateReserve).then(output => {
        return output

    })
}
Item.getFullStock = () => {
    return new Bluebird((resolve, reject) => {
        Item.findAll({
            include: [
                {model: ItemAttribute}
            ]

        }).then(items => {
            resolve(items);

        }).catch(err => {
            reject(err);

        })

    })

}

export default Item;