import _ from 'lodash';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Restrictions from './Restrictions'
import WorkFor from './WorkFor';

const mappings = {
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    jobTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    division: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    accountType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
    },
    employees:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['employees']),
    },
    restrictions:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['restrictions']),
    },
    orders: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['orders'])
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false, 
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

const User = sequelize.define('Users', mappings, {
    indexes: [
        {
            name: 'user_id_index',
            method: 'BTREE',
            fields: ['id'],
        },
        {
            name: 'user_password_index',
            method: 'BTREE',
            fields: ['password'],
        },
        {
            name: 'user_email_index',
            method: 'BTREE',
            fields: ['email'],
        },
        {
            name: 'user_firstName_index',
            method: 'BTREE',
            fields: ['firstName'],
        },
        {
            name: 'user_lastName_index',
            method: 'BTREE',
            fields: ['lastName'],
        },
        {
            name: 'user_jobTitle_index',
            method: 'BTREE',
            fields: ['jobTitle'],
        },
        {
            name: 'user_division_index',
            method: 'BTREE',
            fields: ['division'],
        },
        {
            name: 'user_accountType_index',
            method: 'BTREE',
            fields: ['accountType'],
        },
        {
            name: 'user_department_index',
            method: 'BTREE',
            fields: ['department'],
        },
        {
            name: 'user_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        },
        {
            name: 'user_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        },
    ]
});

/**
 * Funciton to add user into system
 * @param {*} newUser 
 * @returns 
 */
User.createUser = newUser => {
    return new Bluebird((resolve, reject) => {

    })
}

/**
 * Function to retreive all users in the system
 * @returns All Users In System
 */
User.getAllUsers = () => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retreive a specefic user from the system
 * @param {*} userId 
 * @returns 
 */
User.getUserById = userId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to update a user in the system
 * @param {*} userId 
 * @returns 
 */
User.updateUser = userId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to delete user from the system
 * @param {*} userId 
 * @returns 
 */
User.deleteUserById = userId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to retreive the users manager from the system
 * @param {*} managerId 
 * @returns 
 */
function getManager(managerId){
    return new Bluebird((resolve, reject) => {
        
    });
}

/**
 * Function to retreive all employees that work under manager 
 * @param {*} userId 
 * @returns 
 */
function getEmployees(userId){
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * function to retreive all orders user is involved with
 * @returns 
 */
function getOrders(userId){
    return new Bluebird((resolve, reject) => {

    });
}

export default User;