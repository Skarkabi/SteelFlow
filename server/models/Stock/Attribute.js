import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Item from './Item';

const mappings = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    position: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    measurment: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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

const Attribute = sequelize.define('Attributes', mappings, {
    indexes: [
        {
            name: 'attribute_id_index',
            method: 'BTREE',
            fields: ['id'], 
        },
        {
            name: 'attribute_position_index',
            method: 'BTREE',
            fields: ['position'], 
        },
        {
            name: 'attribute_name_index',
            method: 'BTREE',
            fields: ['name'], 
        },
        {
            name: 'attribute_measurment_index',
            method: 'BTREE',
            fields: ['measurment'], 
        },
        {
            name: 'attribute_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },
        {
            name: 'attribute_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        },
    ]
});

export default Attribute;