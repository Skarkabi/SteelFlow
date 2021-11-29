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
    item_id:{
        type: Sequelize.DataTypes.INTEGER,
    },
    measurment: {
        type: Sequelize.DataTypes.STRING,
    },
    quantity: {
        type: Sequelize.DataTypes.DOUBLE,
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

const Bom = sequelize.define('Boms', mappings, {
    indexes: [
        {
            name: 'bom_id_index',
            method: 'BTREE',
            fields: ['id'],   
        },
        {
            name: 'bom_item_id_index',
            method: 'BTREE',
            fields: ['item_id'],   
        },
        {
            name: 'bom_measurment_index',
            method: 'BTREE',
            fields: ['measurment'],   
        },
        {
            name: 'bom_quantity_index',
            method: 'BTREE',
            fields: ['quantity'],   
        },
        {
            name: 'bom_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],   
        },
        {
            name: 'bom_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],   
        }
    ]
});

Bom.createBom = bom => {
    return new Bluebird((resolve, reject) => {
        if(bom){
            Bom.bulkCreate(bom).then(() => {
                resolve("Bom Added");
            }).catch(err => {
                reject(err);
            })
        }else{
            resolve("No Bom to Add");
        }
        
    })
    
}

export default Bom;