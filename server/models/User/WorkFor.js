import _, { reject } from 'lodash';
import bcrypt from 'bcrypt';
import Bluebird, { resolve } from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import User from './User';

const mappings = {
    mId: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Users',
            key:'id'
        }
    },
    eId: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Users',
            key:'id'
        }
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

const WorkFor = sequelize.define('Work_For', mappings, {
    indexes: [
        {
            name: 'work_for_mId_index',
            method: 'BTREE',
            fields: ['mId']
        }, 
        {
            name: 'work_for_eId_index',
            method: 'BTREE',
            fields: ['eId']
        },
        {
            name: 'work_for_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'], 
        },
        {
            name: 'work_for_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'], 
        },
    ]
});

/**
 * Funciton to store manager emplyee relation in system
 * @param {*} newRelation 
 * @returns 
 */
WorkFor.setRelation = newRelation => {
    return new Bluebird((resolve, reject) => {
        WorkFor.create(newRelation).then(() => {
            resolve("Employee Relations Saved!");
        }).catch(err => {
            reject(err);
        });
    })
}

/**
 * Function to update manager employee relation in system
 * @param {*} relation 
 * @returns 
 */
WorkFor.updateRelation = relation => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retreive all employees under manager
 * @param {*} managerId 
 * @returns 
 */
WorkFor.getEmployees = managerId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retrieve employees manager
 * @param {*} employeeId 
 * @returns 
 */
WorkFor.getManager = employeeId => {
    return new Bluebird((resolve, reject) => {

    });
}

export default WorkFor;