import express from 'express';

const router = express.Router();

//Express Route to view all orders
router.get('/view', (req,res,next) => {

});

//Express Route to view specefic order
router.get('/view/:id', (req,res,next) => {

});

//Express Route to create order request
router.post('/request', (req,res,next) => {

});

//Exporess Route to delete order
router.post('/delete/:id', (req,res,next) => {

});

//Express Route to update order
router.post('/update/:id', (req,res,next) => {

});

//Express Route to approve/reject order
router.post('/approved/:id/:approved', (req,res,next) => {

});

//Express Route to update order item status
router.post('/item/update/:id/:item_id', (req,res,next) => {

});

//Express Route to create material request
router.post('/material_request/request/:id/:mr_id', (req,res,next) => {

});

export default router;