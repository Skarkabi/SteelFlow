import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import StockItem from './Item';
import ItemCategory from './ItemCategory';

const mappings = {
    name: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },

    phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },

    items: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['items'])
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

Supplier.addSuplier = newSupplier => {
    return new Bluebird((resolve, reject) => {
        Supplier.create(newSupplier).then(() => {
            resolve("Supplier Registered In System");

        }).catch(err => {
            reject(`Supplier ${newSupplier.name} has already been registered in the system`);

        })

    })

}

Supplier.getAllSuppliers = () => {
    return new Bluebird((resolve, reject) => {
        Supplier.findAll({
            include: [
                {model: StockItem}
            ]

        }).then(found => {
            resolve(found);

        }).catch(err => {
           reject(err);

        })

    })

}

Supplier.getSpecificSupplier = supplierName => {
    return new Bluebird((resolve, reject) => {
        Supplier.findOne({
            where: {
                name: supplierName
            },
            
        }).then(found => {
            let totalValue = 0
            ItemCategory.getSupplierItems(supplierName).then(items => {
                items.map(item => {
                    totalValue = (item.cost * item.quantity) + totalValue;

                })

                items.totalValue = totalValue
                found.setDataValue('items', items)
                resolve(found);

            })

        }).catch(err => {
            reject(err);

        })

    })
    
}


export default Supplier;