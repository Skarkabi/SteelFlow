import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize from 'sequelize';
import sequelize from '../../mySQLDB';
import User from './User';

const mappings = {
    managerId: {
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

const WorkFor = sequelize.define('Work_For', mappings, {
    indexes: [
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

async function getManagerName(id){
    return await User.findOne({where: {id: id}})
}
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
        WorkFor.findOne({
            where: {
                employeeId: employeeId
            }

        }).then(found => {
            User.getUserById(found.managerId).then(manager => {
                resolve({managerId: manager.id, firstName: manager.firstName,  lastName: manager.lastName})

            }).catch(err => {
                reject(err)

            })

        }).catch(err => {
            reject(err);

        })

    });
    
}

export default WorkFor;