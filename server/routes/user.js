import express from 'express';
import User from '../models/User/User';

const router = express.Router();

//Express Route to view all users
router.get('/view', (req,res,next) => {
    User.getAllUsers().then(users => {
        res.render("displayUsers", {
            title: "Users",
            jumbotronDescription: "View all user accounts for registered in the system.",
            users: users,
            user: req.user,
            msgType: req.flash()
        });
    })
});

//Express Route to view specific user
router.get('/view/:id', (req,res,next) => {
    let msg = req.flash();
    User.getUserById(req.params.id).then(user => {
        res.render("displayUser", {
            title: `Employee # ${user.id}'s Page`,
            jumbotronDescription: `This is Employee # ${user.id}'s profile page.`,
            existingUser: user,
            msgType: msg
        })
    }).catch(err => {
        console.log(err)
    })
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

//Express route to create a new user
router.post('/create', (req, res, next) => {
    const newUser = {
        id: req.body.eID,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        division: req.body.division,
        accountType: req.body.userType,
        department: req.body.department,
        managerId: req.body.manager
    }
    User.createUser(newUser).then(output => {
        req.flash('success_msg', output);
        res.redirect('/users/create')
    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('/users/create')
        });
    })
})
//Express route to create user
router.get('/create', (req,res,next) => {
    res.render('createUpdateUser', {
        title: 'Create New User',
        jumbotronDescription: `Register a new user account.`,
        submitButtonText: 'Create',
        action: "/users/create",
        msgType: req.flash()
    });
})

export default router;