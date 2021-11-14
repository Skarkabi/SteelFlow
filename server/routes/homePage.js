import express from 'express';

const router = express.Router();

/** 
 * Express Route to Displays login page.
 */
router.get('/', (req, res, next) => {
    console.log(req);
    //Checking if a user is already logged in
    if (req.user){
            res.render('dashboardForAdmins', 
            {title: 'Home Page',
            jumbotronDescription: "Welcome! This is your dashboard and you can access everything from here easily.",
            msgType: req.flash(),
        })
       

    }else{
       res.redirect('/login');

    }

});

export default router;

