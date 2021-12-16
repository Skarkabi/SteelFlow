import express from 'express';
import Order from '../models/Order/Order';
import Reserve from '../models/Order/Reserve';
import ItemCategory from '../models/Stock/ItemCategory';
import MaterialRequest from '../models/Order/MaterialRequest';
import RequestedItem from '../models/Order/RequestedItem';
import OrderItem from '../models/Order/Item';

const router = express.Router();

//Express Route to view all orders
router.get('/view', (req,res,next) => {
    if(req.user){
        if(req.user.restrictions.view_production){
            Order.getAllOrders(req.user).then(orders => {
                res.render('displayOrders', {
                    title: "Orders",
                    jumbotronDescription: "View all order requests in the the system.",
                    user: req.user,
                    orders: orders,
                    msgType: req.flash()
                });
        
            }).catch(err => {
                req.flash('error_msg', `An Error has occured ${err}`);
                req.session.save(function() {
                    res.redirect('/orders/view')
        
                });
        
            })
            
        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/login')
        
            });

        }

    }else{
        req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/login')
    
            });
    }
   
    

});

//Express Route to view all orders
router.get('/view/approval', (req,res,next) => {
    if(req.user){
        if(req.user.restrictions.approve_production){
            Order.getPendingOrders(req.user.id, req.user.accountType, req.user.division, req.user.department).then(orders => {
                res.render('displayOrders', {
                    title: "Orders",
                    jumbotronDescription: "View all order requests in the the system.",
                    user: req.user,
                    orders: orders,
                    msgType: req.flash()
        
                });
        
            }).catch(err => {
                req.flash('error_msg', `An Error has occured ${err}`);
                req.session.save(function() {
                    res.redirect('/orders/view')
        
                });
        
            })

        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/')
        
            });

        }
        
    }else{
        req.flash('error_msg', `You do not have access to that page`);
        req.session.save(function() {
            res.redirect('/login')
    
        });

    }
    
});

//Express Route to view specefic order
router.get('/view/:id', (req,res,next) => {
    if(req.user){
        if(req.user.restrictions.view_production){
            Order.getOrderById(req.params.id).then(order => {
                if(
                    req.user.id === order.salesEmployeeId || 
                    req.user.id === order.salesManagerId || 
                    req.user.id === order.productionEmployeeId || 
                    req.user.id === order.productionManagerId ||
                    req.user.id === order.requestedBy ||
                    req.user.accountType === "admin" || 
                    (order.department === req.user.division && req.user.accountType === "manager" && req.user.department === "Production")
                ){
                    res.render("displayOrder", {
                        title: `Order # ${order.order_id}`,
                        jumbotronDescription: `Details for  Order # ${order.order_id}.`,
                        order: order,
                        msgType: req.flash(),
                        user: req.user
        
                    })
                
                }else{
                    req.flash('error_msg', `You do not have access to that page`);
                    req.session.save(function() {
                        res.redirect('/login')
        
                    });

                }
               
            }).catch(err => {
                req.flash('error_msg', `An Error has occured ${err}`);
                req.session.save(function() {
                    res.redirect('/orders/view')
        
                });
        
            })

        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/login')
        
            });

        }

    }else{
        req.flash('error_msg', `You do not have access to that page`);
        req.session.save(function() {
            res.redirect('/login')
    
        });

    }

});

router.post('/complete', (req, res,next) => {
    Order.setComplete(req.body.orderId).then(output => {
        req.flash('success_msg', output);
        req.session.save(function() {
            res.redirect('/')

        });

    }).catch(err => {
        console.error(err)
        next();

    });
    
})

router.post('/start', (req, res, next) => {
    RequestedItem.receiveItem(req.body.items).then(output => {
        OrderItem.startProduction(req.body.production).then(output => {
            req.flash('success_msg', "Items have been reserved");
            req.session.save(function() {
                res.redirect('/')

            });

        }).catch(err => {
            console.error(err);
            next();

        })
       
    }).catch(err => {
        console.error(err);
        next();

    })

})

router.get('/request', (req, res, next) => {
    if(req.user){
        if(req.user.restrictions.request_production){
            ItemCategory.getDivisionCategoryStockItems("Mesh").then(output => {
                Order.getLastOrderId().then(orderNumber => {
                    output.map(item => {
                        item.Attributes = JSON.stringify(item.Attributes);
        
                    })
        
                    res.render("createOrder", {
                        title: `Request New Order`,
                        jumbotronDescription: 'Creating a new order request',
                        items: output,
                        orderNumber: orderNumber,
                        msgType: req.flash()
                    }) 
        
                }).catch(err => {
                    req.flash('error_msg', `An Error has occured ${err}`);
                    req.session.save(function() {
                        res.redirect('/orders/view')
            
                    });
                })
                
            }).catch(err => {
                req.flash('error_msg', `An Error has occured ${err}`);
                req.session.save(function() {
                    res.redirect('/orders/view')
        
                });
        
            })

        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/')
    
            });

        }

    }else{
        req.flash('error_msg', `You do not have access to that page`);
        req.session.save(function() {
            res.redirect('/login')
    
        });

    }
    
})

router.post('/bomMaterial', (req, res, next) =>{
    console.log(req)
    let bomItems = req.body.items;
    let materialRequest = req.body.materialRequest
    if(materialRequest.items){
        materialRequest.items.map(item => {
            item.quantity = parseFloat(item.quantity).toFixed(2);
    
        })
    }
    
   
    MaterialRequest.createMaterialRequest(materialRequest).then(() => {
        Reserve.createReserve(bomItems).then(() => {
            req.flash('success_msg', "Items have been reserved");
            req.session.save(function() {
                res.redirect('/')

            });

        }).catch(err => {
            console.error(err)
            next();

        })

    }).catch(err => {
        console.error(err);
        next();

    })
   
})

router.post('/reserve', (req, res, next) => {
    let reserveItems = req.body.items
    Reserve.createReserve(reserveItems).then(() => {
        req.flash('success_msg', "Items have been reserved");
        req.session.save(function() {
            res.redirect('/')

        });
        
    }).catch(err => {
        console.error(err)
        next();
        
    });

})

//Express Route to create order request
router.post('/request', (req,res,next) => {
    let newOrder = {
        order_id: req.body.orderNumber,
        delivery_date: req.body.deliverBy,
        priority: req.body.priority,
        status: "Pending Sales Approval",
        invoiced_amount: req.body.invoiced,
        department: req.body.division,
        salesEmployeeId: req.user.id,
        salesManagerId: req.user.manager,
        requestedBy: req.user.id
    };
    
    if(req.user.accountType !== "employee"){
        newOrder.salesManagerId = req.user.id
        newOrder.approved = true
        newOrder.status = "Pending Production Approval"
        if(req.user.department === "Production"){
            newOrder.productionManagerId = req.user.id
            newOrder.status = "Not Started"
            
        }

    }

    if(req.user.department === "Production"){
        newOrder.productionEmployeeId = req.user.id

    }

    Order.createOrder(newOrder, req.body.orderItems).then(() => {
        req.flash('success_msg', "output");
        req.session.save(function() {
            res.redirect('/')

        });
        
    }).catch(err => {
        console.error(err)
        next();
        
    })

});

router.get('/request/sucess', (req, res, next) =>{
    if(req.user){
        if(req.user.restrictions.request_production){
            req.flash('success_msg', "Order Has Been Added To The System");
            req.session.save(function() {
                res.redirect('/orders/view')

            });

        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/')
    
            });

        }

    }else{
        req.flash('error_msg', `You do not have access to that page`);
        req.session.save(function() {
            res.redirect('/login')
    
        });
    
    }

})

router.get('/complete/success', (req, res, next) =>{
    if(req.user){
        if(req.user.restrictions.request_production){
            req.flash('success_msg', "Order Status Changed to completed");
            req.session.save(function() {
                res.redirect('back')

            });

        }else{
            req.flash('error_msg', `You do not have access to that page`);
            req.session.save(function() {
                res.redirect('/')
    
            });

        }
    
    }else{
        req.flash('error_msg', `You do not have access to that page`);
        req.session.save(function() {
            res.redirect('/login')
    
        });

    }
    
})

router.get('/reserve/sucess', (req, res, next) =>{
    req.flash('success_msg', "Items have been reserved");
    req.session.save(function() {
        res.redirect('back')

    });

})

router.get('/bomMaterial/sucess', (req, res, next) =>{
    req.flash('success_msg', "Items have been reserved");
    req.session.save(function() {
        res.redirect('back')

    });

})

router.get('/reserve/error', (req, res, next) =>{
    req.flash('error_msg', "An Error has occured and Items could not be reserved");
    req.session.save(function() {
        res.redirect('/orders/view')

    });

})

router.get('/complete/error', (req, res, next) =>{
    req.flash('error_msg', "An Error has occured order status could not be changed");
    req.session.save(function() {
        res.redirect('back')

    });

})

router.get('/request/error', (req, res, next) =>{
    req.flash('error_msg', "An Error has occured and order could not be requested");
    req.session.save(function() {
        res.redirect('/orders/view')

    });

})

router.get('/bomMaterial/error', (req, res, next) =>{
    req.flash('error_msg', "An Error has occured and order could not be requested");
    req.session.save(function() {
        res.redirect('/orders/view')

    });

})

//Exporess Route to delete order
router.post('/delete/:id', (req,res,next) => {

});

//Express Route to update order
router.post('/update/:id', (req,res,next) => {

});

router.post('/assign/:id', (req, res, next) =>{
    Order.setProductionEmployee(req.params.id, req.body.productionEmployee).then(output => {
        req.flash('success_msg', output);
        req.session.save(function() {
            res.redirect('back')

        });
        
    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('back')

        });

    })

})

//Express Route to approve/reject order
router.post('/approved/:id', (req,res,next) => {
    Order.approveOrder(req.user.id, req.user.department, req.params.id).then(output => {
        req.flash('success_msg', output);
        req.session.save(function() {
            res.redirect('back')

        });
        
    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('back')

        });

    })
    
});

//Express Route to update order item status
router.post('/item/update/:id/:item_id', (req,res,next) => {

});

//Express Route to create material request
router.post('/material_request/request/:id/:mr_id', (req,res,next) => {

});

export default router;