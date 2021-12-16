import Bluebird, { resolve } from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import StockItem from '../Stock/Item';
import OrderItem from '../Order/Item';

const mappings = {
    mid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    quantity: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
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

const Reserve = sequelize.define('Reserve', mappings, {
    indexes: [
        {
            name: 'reserve_mid_index',
            method: 'BTREE',
            fields: ['mid'], 
        },

        {
            name: 'reserve_quantity_index',
            method: 'BTREE',
            fields: ['quantity'], 
        },

        {
            name: 'reserve_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },

        {
            name: 'reserve_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        },

    ]

});

Reserve.createReserve = reserves => {
    return new Bluebird((resolve, reject) => {
        if(reserves){
            addReserve(reserves).then(() => {
                resolve("Items Reserved")
       
            }).catch(err => {
                reject(err);

            });
            
        }else{
            resolve("Nothing to reserve")

        }
        
    })

}

function addReserve(reserves) {
    return new Bluebird((resolve, reject) => {
        StockItem.reserveItem(reserves).then(output => {
                Reserve.bulkCreate(reserves).then(() => {
                    resolve (output);

            }).catch(err => {
                reject(err);

            })
           
        }).catch(err => {
            reject(err);
            
        }) 
        
    })
    
}

export default Reserve;