import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    attribute_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Attributes',
            key: 'id'
        }
    },
    attribute: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['attribute'])
    },
    item_id:{
        type: Sequelize.INTEGER,
        references: {
            model: 'Stock_Items',
            key: 'id'
        }
    },
    unit: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull:false
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

const ItemAttribute = sequelize.define('Item_Attributes', mappings, {
    indexes: [
        {
            name: 'item_attribute_id_index',
            method: 'BTREE',
            fields: ['id'],   
        },
        {
            name: 'item_attribute_attribute_id_index',
            method: 'BTREE',
            fields: ['attribute_id'],   
        },
        {
            name: 'item_attribute_item_id_index',
            method: 'BTREE',
            fields: ['item_id'],   
        },
        {
            name: 'item_attribute_unit_index',
            method: 'BTREE',
            fields: ['unit'],   
        },
        {
            name: 'item_attribute_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],   
        },
        {
            name: 'item_attribute_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],   
        }
    ]
});

export default ItemAttribute;