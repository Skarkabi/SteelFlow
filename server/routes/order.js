import express from 'express';

const router = express.Router();

router.get('/view', (req,res,next) => {

});

router.get('/view/:id', (req,res,next) => {

});

router.post('/request', (req,res,next) => {

});

router.post('/delete/:id', (req,res,next) => {

});

router.post('/update/:id', (req,res,next) => {

});

router.post('/approved/:id/:approved', (req,res,next) => {

});

router.post('/item/update/:id/:item_id', (req,res,next) => {

});

router.post('/material_request/request/:id/:mr_id', (req,res,next) => {

});

export default router;