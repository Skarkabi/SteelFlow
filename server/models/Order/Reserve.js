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
        console.log(2);
        if(reserves){
            addReserve(reserves).then(() => {
                console.log(9)
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
        console.log(3)
        StockItem.reserveItem(reserves).then(output => {
            OrderItem.reserveItem(reserves).then(o => {
                console.log(7);
                Reserve.bulkCreate(reserves).then(() => {
                    console.log(8)
                    resolve (o);
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
           
        }).catch(err => {
            reject(err);
        }) 
        
    })
    
}

export default Reserve;