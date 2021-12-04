import _, { get } from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Attribute from './Attribute';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unit: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull:false
    },
    name: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, ['name']),

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

ItemAttribute.addItemAttributes = attributes => {
    return new Bluebird((resolve, reject) => {
        ItemAttribute.bulkCreate(attributes).then(() => {
            resolve("Attribute Values Added");

        }).catch(err => {
            reject(err);

        })
    })   
}

export default ItemAttribute;