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

function checkValid(newAttribute){
    return new Bluebird((resolve, reject) =>{
        Attribute.findOne({
            where: {
                position: newAttribute.position,
                name: newAttribute.name,
                measurment: newAttribute.measurment,
                ItemCategoryId: newAttribute.ItemCategoryId
            }

        }).then(found => {
            if(found){
                reject("Category already has this attribute")

            }else{
                resolve("Can Add");

            }
    
        }).catch(err => {
            reject(err);
        
        })

    })

}

Attribute.addAttributes = newAttributes => {
    return new Bluebird((resolve, reject) => {
        return new Bluebird.each(newAttributes, checkValid).then(() => {
            Attribute.bulkCreate(newAttributes).then(() => {
                resolve("Attributes Added")

            }).catch(err => {
                reject(err);
            
            })

        }).catch(err => {
            reject(err);

        })
    
    })
        
}

export default Attribute;