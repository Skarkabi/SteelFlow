import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import ItemAttribute from './ItemAttributes';
import Supplier from './Supplier';

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
    supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Suppliers',
            key: 'id'
        }
    },
    supplier_name: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, ['supplier_name'])
    },
    stock_attributes: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['attributes'])
    },
    item_category_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Item_Categories',
            key: 'id'
        }
    },
    item_category: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['category'])
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
    }
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
            name: 'stock_item_supplier_id_index',
            method: 'BTREE',
            fields: ['supplier_id'], 
        },
        {
            name: 'stock_item_item_category_id_index',
            method: 'BTREE',
            fields: ['item_category_id'], 
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

export default Item;