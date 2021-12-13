import express from 'express';
import ItemCategory from '../models/Stock/ItemCategory';
import Supplier from '../models/Stock/Supplier';
import StockItem from '../models/Stock/Item';

const router = express.Router();

router.get('/view', (req, res, next) => {
    ItemCategory.getAllCategoryStockItems().then(stock => {
        res.render("displayFullStock", {
            title: "Full Stock",
            jumbotronDescription: "View total stock in the system.",
            stock: stock,
            user: req.user,
            msgType: req.flash()

        })
        
    }).catch(err => {
        req.flash(`error_msg', "An Error has occured ${err}`);
        req.session.save(function() {
            res.redirect('/orders/view')

        });

    })

})

router.get('/view/:id', (req, res,next) => {
    ItemCategory.getSpecificStock(req.params.id).then(stock => {
        res.render("displayCategoryStock", {
            title: stock.name,
            jumbotronDescription: "View total stock in the system.",
            stock: stock.Stock_Items,
            attribute: stock.Attributes,
            user: req.user,
            msgType: req.flash()

        })

    }).catch(err => {
        req.flash(`error_msg', "An Error has occured ${err}`);
        req.session.save(function() {
            res.redirect('/orders/view')

        });

    })

})

router.get('/add', (req, res, next) => {
    ItemCategory.getCategoryAndAttributes().then(stock => {
        stock.map(item => {
            let names = []
            let attributeIds = []
            item.Attributes.map(attribute => {
                names.push(`${attribute.name} (${attribute.measurment})`)
                attributeIds.push(attribute.id)

            })

            item.names = names
            item.attributeIds = attributeIds

        })

        Supplier.getAllSuppliers().then(suppliers => {
            res.render('addStock', {
                title: "Add Stock",
                jumbotronDescription: "Add New Item to Stock",
                item: stock,
                user: req.user,
                suppliers: suppliers,
                msgType: req.flash()

            })
            
        }).catch(err => {
            req.flash(`error_msg', "An Error has occured ${err}`);
            req.session.save(function() {
                res.redirect('/orders/view')
    
            });
    
        })
        
    }).catch(err => {
        req.flash(`error_msg', "An Error has occured ${err}`);
        req.session.save(function() {
            res.redirect('/orders/view')

        });

    })

})

router.post('/add', (req, res, next) => {
    let itemAttributes = []
    if(Array.isArray(req.body.attributes)){
        for(let i = 0; i < req.body.attributes.length; i++){
            const newAttribute = {
                unit: req.body.attributes[i],
                AttributeId: req.body.attributeIds[i],
                ProductionItemId: null
            }

            itemAttributes.push(newAttribute);

        }

    }else{
        const newAttribute = {
            unit: req.body.attributes,
            AttributeId: req.body.attributeIds,
            ProductionItemId: null
        }

        itemAttributes.push(newAttribute);

    }

    const newItem = {
        cost: req.body.cost,
        ItemCategoryId: req.body.itemCategory,
        quantity: parseFloat(req.body.quantity),
        itemAttributes: itemAttributes,
        SupplierName: req.body.supplier
    }

    StockItem.createItem(newItem).then(output => {
        req.flash('success_msg', output);
        res.redirect('/stock/add')

    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('/stock/add')

        });

    });

})

router.post('/add/category', (req, res, next) => {
    const newCategory = {
        type: req.body.itemType,
        name: req.body.categoryName,
        attribute_amount: req.body.attributeNumber,
        quantity_unit: req.body.unitType,
        division: req.body.division
    }

    let newBom = null;
    if(req.body.BomAdded !== ""){
        newBom = JSON.parse(req.body.BomAdded);

    }
    
    let newAttribtues = [];
    if(Array.isArray(req.body.attributeName)){
        for(let i = 0; i < req.body.attributeName.length; i++){
            const newAttribute = {
                position: i + 1,
                name: req.body.attributeName[i],
                measurment: req.body.attributeUnit[i]
            }

            newAttribtues.push(newAttribute)
        }

    }else{
        const newAttribute = {
            position: 1,
            name: req.body.attributeName,
            measurment: req.body.attributeUnit
        }

        newAttribtues.push(newAttribute);
    }

    ItemCategory.createCategory(newCategory, newAttribtues, newBom).then(output => {
        req.flash('success_msg', output);
        res.redirect('/stock/add/category')

    }).catch(err => {
        req.flash('error_msg', err);
        req.session.save(function() {
            res.redirect('/stock/add/category')

        });

    })

})

router.get('/add/category', (req, res, next) => {
    ItemCategory.getAllCategoryStockItems().then(items => {
        let jsonItems = [];
        let categoryTypes = items.map(item => {
            jsonItems.push({name: item.name, id: item.id, type: item.type});
            return item.type;

        });
        
        let types = [ ...new Set(categoryTypes)]
        res.render('addItemCategory', {
            title:"Create Item Category",
            jumbotronDescription: "Add a new Item Category to System",
            user: req.user,
            items: JSON.stringify(jsonItems),
            types: types,
            msgType: req.flash()

        });

    }).catch(err => {
        req.flash(`error_msg', "An Error has occured ${err}`);
        req.session.save(function() {
            res.redirect('/orders/view')

        });

    })
    
})

export default router;