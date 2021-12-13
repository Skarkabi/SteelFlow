import _ from 'lodash';
import Bluebird from 'bluebird';
import Sequelize, { Op } from 'sequelize';
import sequelize from '../../mySQLDB';
import Item from './Item';
import MaterialRequest from './MaterialRequest';
import User from '../User/User';
import ItemCategory from '../Stock/ItemCategory';

const mappings = {
    order_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    approved: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    delivery_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
    },
    priority: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    invoiced_amount: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    items:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['items']),
    },
    material_requests:{
        type: Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.JSON, ['material_requests']),
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

const Order = sequelize.define('Orders', mappings, {
    indexes: [
        {
            name: 'orders_order_id_index',
            method: 'BTREE',
            fields: ['order_id'],
        },
        {
            name: 'orders_approved_index',
            method: 'BTREE',
            fields: ['approved'],
        },
        {
            name: 'orders_delivery_date_index',
            method: 'BTREE',
            fields: ['delivery_date'],
        },
        {
            name: 'orders_priority_index',
            method: 'BTREE',
            fields: ['priority'],
        },
        {
            name: 'orders_status_index',
            method: 'BTREE',
            fields: ['status'],
        },
        {
            name: 'orders_invoiced_amount_index',
            method: 'BTREE',
            fields: ['invoiced_amount'],
        },
        {
            name: 'orders_department_index',
            method: 'BTREE',
            fields: ['department'],
        },
        {
            name: 'orders_createdAt_index',
            method: 'BTREE',
            fields: ['createdAt'],
        },
        {
            name: 'orders_updatedAt_index',
            method: 'BTREE',
            fields: ['updatedAt'],
        }
    ]
});

Order.createOrder = (newOrder, orderItems) => {
    return new Bluebird((resolve, reject) => {
        Order.findOne({
            where: {
                order_id: newOrder.order_id
            }
        }).then(found => {
            if(found){
                reject("Order Number already exists in system")
            }else{
                Order.create(newOrder).then(created => {
                    orderItems.map(item => {
                        item.OrderOrderId = created.order_id
                    })
                    return new Bluebird.each(orderItems, function(item){
                        return new Bluebird((resolve, reject) => {
                            Item.createOrderItem(item).then(output =>{
                                resolve(output)
                            }).catch(err => {
                                reject(err)
                            })
                        })
                    }).then(() => {
                        resolve("Order Added in system");
                    }).catch(err => {
                        reject(err);
                    });
                    
                }).catch(err => {
                    reject(err);
                })
            }
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Function to retrieve all orders in system
 * @returns 
 */
Order.getAllOrders = () => {
    return new Bluebird((resolve, reject) => {
        Order.findAll({
            order: [['createdAt', 'DESC']]
        }).then(orders => {
            new Bluebird.each(orders, function(order){
                let notStarted = 0;
                let notStartedOrder = 0;
                return new Bluebird((resolve, reject) => {
                    ItemCategory.getProductionItems(order.order_id).then(items => {
                        let pending = false;
                        let inProgress = false;
                        items.map(item => {
                            item.Production_Items.map(production => {
                                console.log(production)
                                if(production.status === "Pending Material"){
                                    pending = true
                                }else if(production.status === "Not Started"){
                                    notStarted++
                                }
                                if(production.production_quantity !== 0 || production.produced_quantity !== 0){
                                    inProgress = true;
                                }
                            })
                            
                            if(notStarted === item.Production_Items.length){
                                notStartedOrder++;
                            }

                            console.log("NEXT")
                            console.log(notStarted)
                            console.log(item.Production_Items.length)
                            console.log(notStartedOrder)
                            console.log("NEXT")
                            
                        })

                        console.log("STATUS")
                        console.log(order.status)
                        console.log(notStarted)
                        console.log(pending)
                        console.log("STATUS")
                        if(order.status !== "Completed" && order.status !== "Pending Sales Approval" && order.status !== "Pending Production Approval"){
                            if(pending){
                                if(inProgress){
                                    order.status = "In Progress/Pending Material"
                                }else if(!inProgress){
                                    order.status = "Pending Material"
                                }
                                
                            }else if(notStarted === items.length){
                                order.status = "Not Started"
                            }else{
                                order.status = "In Progress"
                            }
                        }
                        resolve("Status Changed")
                    }).catch(err => {
                        reject(err);
                    })
                })
            }).then(() => {
                resolve(orders);
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Function to retreive last order Id in system
 * @returns 
 */
Order.getLastOrderId = () => {
    return new Bluebird((resolve, reject) => {
        Order.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        }).then(found => {
            if(!found){
                resolve(10001);
            }
            const orderNumber = parseInt(found.order_id) + 1
            resolve(orderNumber);
        }).catch(err => {
            reject(err)
        });
    })
}

Order.approveOrder = (employeeId, department, orderId) => {
    return new Bluebird((resolve, reject) => {
        Order.findOne({
            where: {order_id: orderId}
        }).then(found => {
            if(department === "Sales" ){
                found.approved = true;
                found.status = "Pending Production Approval"
            }else if(department === "Production"){
                found.productionManagerId = employeeId
                found.status = "Not Started"
            }
            found.save().then(() => {
                resolve("Order Status has been updated");
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}
/**
 * Function to retrieve specific order in system
 * @param {*} orderId 
 * @returns 
 */
Order.getOrderById = orderId => {
    return new Bluebird((resolve, reject) => {
        Order.findOne({
            where: {
                order_id: orderId
            },
        }).then(found => {
            if(found.productionManagerId && !found.productionEmployeeId){
                User.findAll({
                    where: {
                        department: "Production",
                        division: found.department
                    },
                    attributes: ["id", "firstName", "lastName"]
                }).then(productionTeam => {
                    found.productionTeam = productionTeam
                    let notStartedOrder = 0
                    let notStarted = 0
                   
                    ItemCategory.getProductionItems(orderId).then(items => {
                        
                        let pending = false
                        let inProgress = false
                        items.map(item => {
                            item.Production_Items.map(production => {
                                if(production.status === "Pending Material" ){
                                    pending = true
                                }else if(production.status === "Not Started"){
                                    notStarted++
                                }

                                if(production.production_quantity !== 0 || production.produced_quantity !== 0){
                                    inProgress = true;
                                }
                            })
                            if(notStarted === item.Production_Items.length){
                                notStartedOrder++;
                            }
                            
                        })

                        console.log(found.status)
                        console.log(pending)
                        if(found.status !== "Completed" && found.status !== "Pending Sales Approval" && found.status !== "Pending Production Approval"){
                            if(pending){
                                console.log(11)
                                console.log(inProgress)
                                if(inProgress){
                                    console.log(2)
                                    found.status = "In Progress/Pending Material"
                                }else if(!inProgress){
                                    console.log(3)
                                    found.status === "Pending Material"  
                                }
                            }else if(notStarted === items.length){
                                console.log(4)
                                found.status = "Not Started"
                            }else{
                                console.log(5)
                                found.status = "In Progress"
                            }
                        }
                        
                        found.setDataValue('items', items)
                        resolve(found);
                    }).catch(err => {
                        reject(err);
                    })
                }).catch(err => {
                    reject(err);
                })
            }else{
                
                let notStarted = 0
                let notStartedOrder = 0
                ItemCategory.getProductionItems(orderId).then(items => {
                    let pending = false
                    let inProgress = false
                    items.map(item => {
                        item.Production_Items.map(production => {
                            if(production.status === "Pending Material"){
                                pending = true
                            }else if(production.status === "Not Started"){
                                notStarted++
                            }

                            if(production.production_quantity !== 0 || production.produced_quantity !== 0){
                                inProgress = true;
                            }
                        })
                        if(notStarted === item.Production_Items.length){
                            notStartedOrder++;
                        }
                        
                    })


                    console.log(found.status)
                    console.log(pending)
                    console.log(notStarted)
                    console.log(items.length)
                    if(found.status !== "Completed" && found.status !== "Pending Sales Approval" && found.status !== "Pending Production Approval"){
                        if(pending){
                            console.log(11)
                            if(inProgress){
                                console.log(2)
                                found.setDataValue('status', "In Progress/Pending Material")
                            }else if(!inProgress){
                                console.log(33)
                                found.setDataValue('status',"Pending Material")  
                            }
                        }else if(notStarted === items.length){
                            console.log(4)
                            found.setDataValue('status', "Not Started")
                        }else{
                            console.log(5)
                            found.setDataValue('status',"In Progress")
                        }
                        
                    }
                    
                    found.setDataValue('items', items)
                    resolve(found);
                }).catch(err => {
                    reject(err);
                })
            }
            
        }).catch(err => {
            reject(err);
        })
    });
}

/**
 * Function to delete specefied order in system
 * @param {*} orderId 
 * @returns 
 */
Order.deleteOrder = orderId => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to update order in system
 * @param {*} order 
 * @returns 
 */
Order.updateOrder = order => {
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to set approvel status of order
 * @param {*} orderId 
 * @param {*} approved 
 * @returns 
 */
Order.setApproved = (orderId, approved) => {
    return new Bluebird((resolve, reject) => {

    });
}

Order.getPendingOrders = (employeeId, position, division, department) => {
    return new Bluebird((resolve, reject) => {
        if(position !== "employee"){
            if(department === "Sales"){
                Order.findAll({
                    where:{
                        [Op.or]: {
                            productionManagerId: employeeId,
                            salesManagerId: employeeId,
                        },
                        status: "Pending Sales Approval"
                    }
                }).then(found => {
                    resolve(found);
                }).catch(err => {
                    reject(err);
                })
            }else{
                Order.findAll({
                    where:{
                        department: division,
                        approved: true,
                        productionManagerId: null
                    }
                }).then(found => {
                    resolve(found);
                }).catch(err => {
                    reject(err);
                })
            }
           
        }else{
            reject("Employee is can not approve any orders");
        }
    })
}
Order.getOrderByEmployee = (employeeId, department, position) => {
    return new Bluebird((resolve, reject) => {
        let condition = null;
        if(department === "sales"){
            if(position === "manager"){
                condition = {salesManagerId: employeeId}
            }else{
                condition = {salesEmployeeId: employeeId}
            }
        }else if(department === "production"){
            if(position === "manager"){
                condition = {productionManagerId: employeeId}
            }else{
                condition = {productionEmployeeId: employeeId}
            }
        }
        Order.findAll({
            where: condition
        }).then(found => {
            resolve(found)
        }).catch(err => {
            reject(err);
        })
    })
}

Order.setProductionEmployee = (orderId, productionId) => {
    return new Bluebird((resolve, reject) => {
        Order.findOne({
            where: {
                order_id: orderId
            }
        }).then(found => {
            found.update({ productionEmployeeId: productionId });
            found.save().then(() => {
                resolve("Production Employee Assigned")
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

Order.setComplete = orderId => {
    return new Bluebird((resolve, reject) => {
        Order.update(
            { status: "Completed"},
            { where: 
                { order_id: orderId }
            } 
        ).then(() => {
            resolve("Status Updated")
        }).catch(err => {
            reject(`Error Occured ${err}`)
        })
    })
}
/**
 * Function to set all material requests for specefied order
 * @param {*} orderId 
 * @returns 
 */
function getMaterialRequests(orderId){
    return new Bluebird((resolve, reject) => {

    });
}

/**
 * Function to set all items needed for specefied order
 * @param {*} orderId 
 * @returns 
 */
function getOrderItems(orderId){
    return new Bluebird((resolve, reject) => {

    })
}

export default Order;