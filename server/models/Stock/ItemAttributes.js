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
    attribute: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['attribute'])
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