import express from 'express';
import Supplier from '../models/Stock/Supplier';

const router = express.Router();

router.get('/view', (req, res, next) => {
    if(req.user){
        if(req.user.restrictions.view_supplier){
            Supplier.getAllSuppliers().then(suppliers => {
                res.render('displaySuppliers', {
                    title: "Suppliers",
                    jumbotronDescription: "View all suppleirs registered in the system",
                    user: req.user,
                    suppliers: suppliers,
                    msgType: req.flash()
        
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
            res.redirect('/')
    
        });

    }

})

router.get('/view/:supplierName', (req, res, next) => {
    if(req.user){
        if(req.user.restrictions.view_supplier){
            Supplier.getSpecificSupplier(req.params.supplierName).then(supplier => {
                res.render('displaySupplier', {
                    title: `${req.params.supplierName}`,
                    jumbotronDescription: `Supplier ${req.params.supplierName} Details`,
                    supplier: supplier,
                    user: req.user,
                    msgType: req.flash()
        
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

router.get('/register', (req, res, next) => {
    if(req.user){
        if(req.user.restrictions.view_supplier){
            res.render('createUpdateSupplier', {
                title: "Register New Supplier",
                jumbotronDescription: "Register new supplier and details to system",
                user: req.user,
                msgType: req.flash()
                
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

router.post('/register', (req, res, next) => {
    const newSupplier = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    Supplier.addSuplier(newSupplier).then(output => {
        req.flash('success_msg', output);
        res.redirect('/supplier/register')

    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('/supplier/register')

        });

    })
    
})

export default router;