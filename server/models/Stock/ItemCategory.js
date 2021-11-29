import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize, { Op } from 'sequelize';
import sequelize from '../../mySQLDB';
import Attribute from './Attribute';
import Bom from './Bom';
import StockItem from './Item';
import ItemAttribute from './ItemAttributes';
import ProducitonItem from '../Order/Item';

const mappings = {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    division: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "All"
    },
    bom: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['bom'])
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    attribute_amount:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    attributes: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['attributes'])
    },
    quantity_unit: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pieces"
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

const ItemCategory = sequelize.define('Item_Categories', mappings, {
    indexes: [
        {
            name: 'item_category_id_index',
            method: 'BTREE',
            fields: ['id'], 
        },
        {
            name: 'item_category_type_index',
            method: 'BTREE',
            fields: ['type'], 
        },
        {
            name: 'item_category_division_index',
            method: 'BTREE',
            fields: ['type'], 
        },
        {
            name: 'item_category_name_index',
            method: 'BTREE',
            fields: ['name'], 
        },
        {
            name: 'item_category_attribute_amount_index',
            method: 'BTREE',
            fields: ['attribute_amount'], 
        },
        {
            name: 'item_category_quantity_unit_index',
            method: 'BTREE',
            fields: ['quantity_unit'], 
        },
        {
            name: 'item_category_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },
        {
            name: 'item_category_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        }
    ]
});

ItemCategory.createCategory = (itemCategory, categoryAttributes, categoryBom) => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findOne({
            where: {
                type: itemCategory.type,
                name: itemCategory.name,
                attribute_amount: itemCategory.attribute_amount,
                quantity_unit: itemCategory.quantity_unit
            }
        }).then(found => {
            if(found){
                reject("Item Category alreadt exists")
            }else{
                ItemCategory.create(itemCategory).then(newCategory => {
                    if(categoryBom){
                        categoryBom.map(bom => {
                            bom.ItemCategoryId = newCategory.id;
                        });
                    }
                    categoryAttributes.map(attribute => {
                        attribute.ItemCategoryId = newCategory.id
                    })
                    console.log("MY BOM *************");
                    console.log(categoryBom);
                    Attribute.addAttributes(categoryAttributes).then(() => {
                        Bom.createBom(categoryBom).then(() => {
                            resolve("Item Category Added to System");
                        }).catch(err => {
                            newCategory.destroy().then(() => {
                                reject(err);
                            }).catch(err => {
                                reject(err);
                            })
                        })
                        
                    }).catch(err => {
                        newCategory.destroy().then(() => {
                            reject(err);
                        }).catch(err => {
                            reject(err);
                        })
                        
                    })
                    
                }).catch(err => {
                    reject(err);
                })
            }
        }).catch(err => {
            reject(err)
        })
    })
}

ItemCategory.getAllCategoryStockItems = () => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findAll({
            include: [
                {model: StockItem},
                {model: Attribute}
            ]
        }).then(found => {
            found.map(category => {
                let totalQuantity = 0;
                let totalReserverd = 0
                category.Stock_Items.map(item => {
                    totalQuantity = totalQuantity + item.quantity;
                    totalReserverd = totalReserverd + item.reserved
                })
                category.totalQuantity = totalQuantity
                category.totalReserverd = totalReserverd
            })
            resolve(found);
        }).catch(err => {
            reject(err);
        })
    })
}

ItemCategory.getDivisionCategoryStockItems = division => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findAll({
            where: {
                division: division,
                type: {
                    [Op.not]: "Raw Material"
                }
            },
            include: [
                {model: StockItem},
                {model: Attribute}
            ]
        }).then(found => {
            found.map(category => {
                let totalQuantity = 0;
                let totalReserverd = 0
                category.Stock_Items.map(item => {
                    totalQuantity = totalQuantity + item.quantity;
                    totalReserverd = totalReserverd + item.reserved
                })
                category.totalQuantity = totalQuantity
                category.totalReserverd = totalReserverd
            })
            resolve(found);
        }).catch(err => {
            reject(err);
        })
    })
}

ItemCategory.getCategoryAndAttributes = () => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findAll({
            include: [
                {model: Attribute}
            ]
        }).then(found => {
            resolve(found)
        }).catch(err => {
            reject(err);
        })
    })
}
ItemCategory.getProductionItems = orderId => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findAll({
            include: [
                {model: Attribute},
                {model:ProducitonItem,
                    where: {
                        OrderOrderId: orderId
                    },
                    include: [
                        {model: ItemAttribute}
                    ],
                    order: ["unit", "ASC"]
                }
            ],
            order: [[Attribute, "position", "ASC"]]
        }).then(found => {
            found.map(foundItems => {
                foundItems.Production_Items.map(item => {
                    let attributes = [];
                    item.Item_Attributes.map(attribute => {
                        const foundAttribute = foundItems.Attributes.find(attr => {
                            return attr.id === attribute.AttributeId
                        })
                        attribute.position = foundAttribute.position
                        attribute.measurment = foundAttribute.measurment
                        attributes[attribute.position - 1] = attribute
                    })
                    item.Item_Attributes = attributes;
                    item.name = foundItems.name
                    let details = ""
                    for(let i = 0; i < attributes.length; i++){
                        if(details !== ""){
                            details = `${details} x ${attributes[i].unit} ${attributes[i].measurment}`
                        }else{
                            details = `${attributes[i].unit} ${attributes[i].measurment}`
                        }
                        
                    };
                    item.details = details
                })
            })
            
            resolve(found);
        }).catch(err => {
            reject(err);
        })
    })
}
ItemCategory.getSpecificStock = id => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findOne({
            where: {
                id: id
            },
            include: [
                {model: Attribute},
                {model: StockItem,
                    include: [
                        {model: ItemAttribute}
                    ],
                    order: ["unit", "ASC"]
                }
            ],
            order: [[Attribute, "position", "ASC"]]
        }).then(found => {
            found.Stock_Items.map(item => {
                let attributes = [];
                item.Item_Attributes.map(attribute => {
                    const foundAttribute = found.Attributes.find(attr => {
                        return attr.id === attribute.AttributeId
                    })
                    attribute.position = foundAttribute.position
                    attributes[attribute.position - 1] = attribute
                })
                item.Item_Attributes = attributes;
                
            })
            resolve(found);
        }).catch(err => {
            reject(err);
        })
    })
    
}

ItemCategory.getSupplierItems = supplierName => {
    return new Bluebird((resolve, reject) => {
        ItemCategory.findAll({
            include: [
                {model: Attribute},
                {model:StockItem,
                    where: {
                        SupplierName: supplierName
                    },
                    include: [
                        {model: ItemAttribute}
                    ],
                    order: ["unit", "ASC"]
                }
            ],
            order: [[Attribute, "position", "ASC"]]
        }).then(found => {
            let stockItems = [];
            found.map(foundItems => {
                foundItems.Stock_Items.map(item => {
                    let attributes = [];
                    item.Item_Attributes.map(attribute => {
                        const foundAttribute = foundItems.Attributes.find(attr => {
                            return attr.id === attribute.AttributeId
                        })
                        attribute.position = foundAttribute.position
                        attribute.measurment = foundAttribute.measurment
                        attributes[attribute.position - 1] = attribute
                    })
                    item.Item_Attributes = attributes;
                    item.name = foundItems.name
                    let details = ""
                    for(let i = 0; i < attributes.length; i++){
                        if(details !== ""){
                            details = `${details} x ${attributes[i].unit} ${attributes[i].measurment}`
                        }else{
                            details = `${attributes[i].unit} ${attributes[i].measurment}`
                        }
                        
                    };
                    item.details = details
                    stockItems.push(item);
                })
            })
            
            resolve(stockItems);
        }).catch(err => {
            reject(err);
        })
    })
}
export default ItemCategory;