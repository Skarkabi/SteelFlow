import express from 'express';
import { reject } from 'lodash';
import Order from '../models/Order/Order';
import ItemAttribute from '../models/Stock/ItemAttributes';
import ItemCategory from '../models/Stock/ItemCategory';

const router = express.Router();

//Express Route to view all orders
router.get('/view', (req,res,next) => {
    Order.getAllOrders().then(orders => {
        res.render('displayOrders', {
            title: "Orders",
            jumbotronDescription: "View all order requests in the the system.",
            user: req.user,
            orders: orders,
            msgType: req.flash()
        });

    }).catch(err => {

    })
});

//Express Route to view all orders
router.get('/view/approval', (req,res,next) => {
    Order.getPendingOrders(req.user.id, req.user.accountType, req.user.division, req.user.department).then(orders => {
        res.render('displayOrders', {
            title: "Orders",
            jumbotronDescription: "View all order requests in the the system.",
            user: req.user,
            orders: orders,
            msgType: req.flash()
        });

    }).catch(err => {

    })
});

//Express Route to view specefic order
router.get('/view/:id', (req,res,next) => {
    let msg = req.flash();
    Order.getOrderById(req.params.id).then(order => {
        res.render("displayOrder", {
            title: `Order # ${order.order_id}`,
            jumbotronDescription: `Details for  Order # ${order.order_id}.`,
            order: order,
            msgType: msg,
        })
    }).catch(err => {
        console.log(err);
    })
});

router.get('/request', (req, res, next) => {
    ItemCategory.getDivisionCategoryStockItems("Mesh").then(output => {
        Order.getLastOrderId().then(orderNumber => {
            console.log(orderNumber)
            output.map(item => {
                item.Attributes = JSON.stringify(item.Attributes);
            })
            console.log(output[0]);
            res.render("createOrder", {
                title: `Request New Order`,
                jumbotronDescription: 'Creating a new order request',
                items: output,
                orderNumber: orderNumber,
                msgType: req.flash()
            }) 
        }).catch(err => {
            console.error(err);
        })
        
    }).catch(err => {
        console.error(err);
    })
   
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
        salesManagerId: req.user.manager
    };
    
    if(req.user.accountType !== "employee"){
        newOrder.salesManagerId = req.user.id
        newOrder.approved = true
        if(req.user.department === "Production"){
            newOrder.productionManagerId = req.user.id
            newOrder.status = "Not Started"
        }
    }
    if(req.user.department === "Production"){
        newOrder.productionEmployeeId = req.user.id
    }
    Order.createOrder(newOrder, req.body.orderItems).then(output => {
        console.log("Posting Work");
        req.flash('success_msg', "output");
        req.session.save(function() {
            res.redirect('/')
        });
        
    }).catch(err => {
        console.log("Posting Fail");
        console.error(err)
        next();
        
    })
    console.log(req.body.orderItems[0]);

});

router.get('/request/sucess', (req, res, next) =>{
    req.flash('success_msg', "Order Has Been Added To The System");
    req.session.save(function() {
        res.redirect('/orders/view')
    });
})

router.get('/request/error', (req, res, next) =>{
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