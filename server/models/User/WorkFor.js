import _ from 'lodash';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';
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

export default WorkFor;