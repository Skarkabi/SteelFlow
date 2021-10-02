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
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    phone: {
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
    }
}

const Supplier = sequelize.define('Suppliers', mappings, {
    indexes: [
        {
            name: 'supplier_id_index',
            method: 'BTREE',
            fields: ['id'], 
        },
        {
            name: 'supplier_name_index',
            method: 'BTREE',
            fields: ['name'], 
        },
        {
            name: 'supplier_email_index',
            method: 'BTREE',
            fields: ['email'], 
        },
        {
            name: 'supplier_phone_index',
            method: 'BTREE',
            fields: ['phone'], 
        },
        {
            name: 'supplier_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },
        {
            name: 'supplier_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        }
    ]
});

export default Supplier;