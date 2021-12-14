import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';

const mappings = {
    user_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
    },

    view_users:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    edit_users:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    create_users:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    view_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    edit_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    view_stock:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    view_supplier:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    edit_supplier:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    edit_item_category: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    edit_stock:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    view_material_request:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    edit_material_request:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    request_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    approve_production:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
            name: 'restrictions_create_users_index',
            method: 'BTREE',
            fields: ['create_users'],
        },

        {
            name: 'restrictions_edit_users_index',
            method: 'BTREE',
            fields: ['edit_users'],
        },

        {
            name: 'restrictions_view_supplier_index',
            method: 'BTREE',
            fields: ['view_supplier'],
        },

        {
            name: 'restrictions_edit_supplier_index',
            method: 'BTREE',
            fields: ['edit_supplier'],
        },

        {
            name: 'restrictions_view_production_index',
            method: 'BTREE',
            fields: ['view_production'],
        },

        {
            name: 'restrictions_approve_production_index',
            method: 'BTREE',
            fields: ['approve_production'],
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
            name: 'restrictions_edit_item_category_index',
            method: 'BTREE',
            fields: ['edit_item_category'],
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

/**
 * Function to retreive user restrictions
 * @param {*} userId 
 * @returns 
 */
Restrictions.getRestricitons = userId => {
    return new Bluebird((resolve, reject) => {
        
    });
}
export default Restrictions;