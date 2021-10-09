import express from 'express';

const router = express.Router();

//Express Route to view all users
router.get('/view', (req,res,next) => {

});

//Express Route to view specific user
router.get('/view/:id', (req,res,next) => {

});

//Express Route to view all employees of manager
router.get('/view/staff/:id', (req, res, next) => {

});

//Express Route to update user
router.post('/update/:id', (req,res,next) => {

});

//Expres route to delete user
router.post('/delete/:id', (req,res,next) => {

});

export default router;