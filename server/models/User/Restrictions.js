import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';

const mappings = {
    user_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    view_users:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    edit_users:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    view_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    edit_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    view_stock:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    edit_stock:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    view_material_request:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    edit_material_request:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
    },
    request_production:{
        type: Sequelize.DataTypes.BOOLEAN,
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

const Restrictions = sequelize.define('Restrictions', mappings, {
    indexes: [
        {
            name: 'restrictions_user_id_index',
            method: 'BTREE',
            fields: ['user_id'],
        },
        {
            name: 'restrictions_view_users_index',
            method: 'BTREE',
            fields: ['view_users'],
        },
        {
            name: 'restrictions_edit_users_index',
            method: 'BTREE',
            fields: ['edit_users'],
        },
        {
            name: 'restrictions_view_production_index',
            method: 'BTREE',
            fields: ['view_production'],
        },
        {
            name: 'restrictions_edit_production_index',
            method: 'BTREE',
            fields: ['edit_production'],
        },
        {
            name: 'restrictions_view_stock_index',
            method: 'BTREE',
            fields: ['view_stock'],
        },
        {
            name: 'restrictions_edit_stock_index',
            method: 'BTREE',
            fields: ['edit_stock'],
        },
        {
            name: 'restrictions_view_material_request_index',
            method: 'BTREE',
            fields: ['view_material_request'],
        },
        {
            name: 'restrictions_edit_material_request_index',
            method: 'BTREE',
            fields: ['edit_material_request'],
        },
        {
            name: 'restrictions_request_production_index',
            method: 'BTREE',
            fields: ['request_production'],
        },
        {
            name: 'restrictions_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        },
        {
            name: 'restrictions_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        }, 
    ]
});

/**
 * Function to add user restriction in system
 * @param {*} newRestriction 
 * @returns 
 */
Restrictions.createRestriction = newRestriction => {
    return new Bluebird((resolve, reject) => {
        Restrictions.create(newRestriction).then(() => {
            resolve(`Restrictions for user ${newRestriction.user_id} added to system!`)
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Function to update users restrictions
 * @param {*} restrictions 
 * @returns 
 */
Restrictions.updateRestrictions = restrictions => {
    return new Bluebird((resolve, reject) => {
        
    });
}
export default Restrictions;