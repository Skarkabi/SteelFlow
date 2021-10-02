import _ from 'lodash';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import Restrictions from './Restrictions'

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

User.hasOne(Restrictions);

export default User;