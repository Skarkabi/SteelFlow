import _ from 'lodash';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';
import Sequelize, { Op } from 'sequelize';
import sequelize from '../../mySQLDB';
import WorkFor from './WorkFor';
import Order from '../Order/Order';
import Restrictions from './Restrictions';

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

    manager: {
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON ['manager'])
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

function setManager(user){
    return new Bluebird((resolve, reject) => {
        User.findOne({
            where: {
                id: user.Work_For.managerId

            },

            attributes: ["firstName", "lastName"],

        }).then(found => {
            user.setDataValue('manager', {firstName: found.firstName, lastName: found.lastName})
            resolve(user)

        }).catch(err => {
            reject(err)

        })

    })
    
}

/**
 * Funciton to add user into system
 * @param {*} newUser 
 * @returns 
 */
User.createUser = newUser => {
    return new Bluebird((resolve, reject) => {
        //using bcrypt to encrypt the password for the user before saving
        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(newUser.password, salt, function (e, hash){
                if(e) reject (e);
                //Checking if the user id already exists
                User.getUserById(newUser.id).then(isUserRegestered => {
                    //If user id exists reject user input
                    if(isUserRegestered){
                        reject ("Employee with ID# " + newUser.id+ " Already Registered");

                    }else{
                        newUser.password = hash;
                        User.create(newUser).then(addedUser => {
                            WorkFor.setRelation({employeeId: newUser.id, managerId: newUser.managerId}).then(output => {
                                resolve("Emplyee With ID# " + newUser.id + " Was Sucessfully Added!");
                    
                            }).catch(err => {
                                addedUser.destroy().then(() => {
                                    reject(err);

                                }).catch(err => {
                                    reject(err);

                                })

                            })
                
                        }).catch(err => {
                            reject(err);

                        });

                    }

                }).catch(err => {
                    reject(err);

                });

            });

        });

    });

}

/**
 * Function to retreive all users in the system
 * @returns All Users In System
 */
User.getAllUsers = () => {
    return new Bluebird((resolve, reject) => {
        User.findAll().then(found => {
            resolve(found)

        }).catch(err => {
            reject(err);

        })

    });

}

/**
 * Function to retreive a specefic user from the system
 * @param {*} userId 
 * @returns 
 */
User.getUserById = userId => {
    return new Bluebird((resolve, reject) => {
        User.findOne({
            where: {
                id: userId
            },
            include:[
                { model: WorkFor },
                { model: Restrictions, required: false},
                { model: Order, as: "salesEmployee", required:false,
                    where: {
                        requestedBy: {
                            [Op.not]: userId

                        },

                    }

                },

                { model: Order, as: "salesManager", required:false, 
                    where: {
                        requestedBy: {
                            [Op.not]: userId

                        },

                    }

                },

                { model: Order, as: "productionManager", required:false,
                    where: {
                        requestedBy: {
                            [Op.not]: userId

                        },

                    }

                },

                { model: Order, as: "productionEmployee", required:false,
                    where: {
                        requestedBy: {
                            [Op.not]: userId

                        },

                    }

                },
                
                { model: Order, as: "requestEmployee", required:false},

            ]
        }).then(found => {
            if(found){
                const orders = []
                orders.push(
                    ...found.salesEmployee, 
                    ...found.salesManager, 
                    ...found.productionManager, 
                    ...found.productionEmployee, 
                    ...found.requestEmployee
                );

                delete found.salesEmployee;
                delete found.salesManager;
                delete found.productionManager;
                delete found.productionEmployee;
                delete found.requestEmployee;
                setRequestedBy(orders).then(finalOrders => {
                    found.Orders = finalOrders
                    setManager(found).then(user => {
                        getEmployees(user).then(user =>{
                            resolve(user)

                        }).catch(err => {
                            reject(err);

                        })
                        
                    }).catch(err => {
                        reject(err)

                    })  

                })
                 
            }else{
                resolve(null)

            }
            
        }).catch(err => {
            reject(err);

        })

    });

}


function getRequestedByName(order){
    return new Bluebird((resolve, reject) => {
        User.findOne({
            where: {
                id: order.requestedBy

            },

            attributes: ["firstName", "lastName"]
            
        }).then(found => {
            resolve(order.requested = `${found.firstName} ${found.lastName}`)

        }).catch(err => {
            reject(err);

        })

    })

}
function setRequestedBy(orders){
    return new Bluebird((resolve, reject) => {
        return new Bluebird.each(orders, getRequestedByName).then(() =>{
            resolve(orders)

        }).catch(err => {
            reject(err);

        })

    })
       
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
function getEmployees(user){
    return new Bluebird((resolve, reject) => {
        WorkFor.findAll({
            where: {
                managerId: user.id

            }

        }).then(employees => {
            let employeeIds = [];
            employees.map(employee => {
                employeeIds.push(employee.employeeId)

            })

            User.findAll({
                where: {
                    id: employeeIds
                }

            }).then(employeeDetails => {
                user.setDataValue('employees', employeeDetails)
                resolve(user)

            }).catch(err => {
                reject(err);

            })
            
        }).catch(err => {
            reject(err);

        })

    });

}

/**
 * function to retreive all orders user is involved with
 * @returns 
 */
function getOrders(user){
    return new Bluebird((resolve, reject) => {
        
    });
}

/**
 * Function to decypt password and check if it is a match
 * @param {*} password 
 * @returns false if password does not match
 */
User.prototype.comparePassword = function (password) {
    return Bluebird.resolve().then(() => 
        bcrypt.compare(password, this.password)).catch(
            (err) => {
                return false;
  
            }
  
        );
        
};
  
export default User;