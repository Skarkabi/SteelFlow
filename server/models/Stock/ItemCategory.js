import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Attribute from './Attribute';
import Bom from './Bom';

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

ItemCategory.hasMany(Attribute);
ItemCategory.hasMany(Bom);

export default ItemCategory;