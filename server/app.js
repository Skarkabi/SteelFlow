import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import handlebars from 'handlebars';
import hbs from 'express-handlebars';
import hbshelpers from 'handlebars-helpers';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import sequelizeStore from 'connect-session-sequelize'
import bodyParser from 'body-parser';
import passportConfig from './passport';
import sequelize from './mySQLDB';
import breadcrumbs from 'express-breadcrumbs';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
require('./models/Session');
require('dotenv').config
require('./models/index');
import signInRouter from './routes/sign-in';
import signOutRouter from './routes/sign-out';
import homePageRouter from './routes/homePage';
import userRouter from './routes/user';
import orderRouter from './routes/order';
import stockRouter from './routes/stock';
import supplierRouter from './routes/supplier';

handlebars.registerHelper("counter", function (index){
    return index + 1;

});

handlebars.registerHelper("getElement", function (array, index, property){
    return array[parseInt(index)][property];

});

handlebars.registerHelper("add", function (a, b){
    return a + b;

});

handlebars.registerHelper("multiply", function (a, b){
    return a + b;

});


handlebars.registerHelper('isdefined', function (value, compare) {
    return value === compare;

});

  handlebars.registerHelper('console', function (value){
    return console.log("Outputting " + JSON.stringify(value));

})

handlebars.registerHelper('stringify', function (value){
    return JSON.stringify(value);

})

handlebars.registerHelper('formatDate', function (value){
    if(value){
        return value.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit'})

    }else{
        return "Pending Confirmation"

    }
    
})

handlebars.registerHelper("getArray", function(array, spot){
    return (array[parseInt(spot)]);

})

const app = express();

const multiHelpers = hbshelpers()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
    'hbs', 
    hbs(
        {
            helpers: multiHelpers,
            extname: 'hbs', 
            defaultLayout: 'layout', 
            layoutsDir: __dirname + '/views/', 
            handlebars: allowInsecurePrototypeAccess(handlebars)
        }
    )
)

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const SequelizeStore = sequelizeStore(session.Store);
app.use(session(
    {
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie : {maxAge: 120 * 60 * 1000},
        store: new SequelizeStore({ db: sequelize, table: 'Session'}),
    }
));

app.use(flash());
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();

});


passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', signInRouter);
app.use('/', homePageRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/stock', stockRouter);
app.use('/supplier', supplierRouter);
app.use('/logout', signOutRouter);
app.use(function (req, res, next){
    app.locals.user = req.user;
    next();

})

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.validation_error_msg = req.flash('validation_error_msg');
    res.locals.error = req.flash('error');
    next();

});

app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome({name: 'Dashboard', url: '/'}));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/file-saver', express.static(path.join(__dirname,'../node_modules/file-saver/dist')));
app.use('/xlsx', express.static(path.join(__dirname,'../node_modules/xlsx/dist')));
app.use('/exceljs', express.static(path.join(__dirname,'../node_modules/exceljs/dist')));
app.use((req, res, next) =>
{
    next(createError(404));
});

/**
 * Error handler
 */

app.use((err, req, res, next) =>
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    
});

/*
const secondUser = {
    id: "100944655",
    password: "123456789",
    email: "saleemkarkabi@cmail.carleton.ca",
    firstName: "Saleem",
    lastName: "Karkabi",
    jobTitle: "Cheif Executive Officer",
    division: "Administration",
    accountType: "admin",
    department: "Administration",
    managerId: "100944655"
}

const newUser = {
    id: "100944656",
    password: "123456789",
    email: "saleemkarkabi@test.com",
    firstName: "John",
    lastName: "Karkabi",
    jobTitle: "Plant Engineer",
    division: "Mesh",
    accountType: "employee",
    department: "production",
    managerId: "100944657"
}


const newOrder = {
    order_id: "10002",
    priority: "High",
    status: "In Progress",
    invoiced_amount: 12312.98,
    department: "Mesh",
    requestedBy: "100944655",
    salesEmployeeId: "100944655",
    salesManagerId: "100944655",
    productionEmployeeId: "100944656",
    productionManagerId: "100944657",

}

Order.createOrder(newOrder).then(output => {
    console.log(output)
}).catch(err => {
    console.log(err);
})



const newCategory = {
    type: "Raw Material",
    name: "GI Steel Coil",
    attribute_amount: 3,
    quantity_unit: "Tons"
}

const attributeOne = {
    ItemCategoryId: 1,
    position: 1,
    name: "width",
    measurment: "mm"
}

const attributeTwo = {
    ItemCategoryId: 1,
    position: 2,
    name: "length",
    measurment: "mm"
}

const attributeThree = {
    ItemCategoryId: 1,
    position: 3,
    name: "thickness",
    measurment: "mm"
}

const itemA1 = {
    unit: 1220,
    AttributeId: 1,
    ProductionItemId: null
}

const itemA2 = {
    unit: 400,
    AttributeId: 2,
    ProductionItemId: null
}
     
const itemA3 = {
    unit: 3,
    AttributeId: 3,
    ProductionItemId: null
}

const newItem = {
    cost: 10,
    ItemCategoryId: 1,
    quantity: 20,
    itemAttributes: [itemA1, itemA2, itemA3]
}

const newSupplier = {
    name: "T.M.I.",
    email: "skarkabi@tmico.ae",
    phone: "0506660187",

}
const reserves = [
    {quantity: 1, ProductionItemId: 1, StockItemId: 1},
    {quantity: 1, ProductionItemId: 2, StockItemId: 1},
    {quantity: 1, ProductionItemId: 3, StockItemId: 1},
    {quantity: 1, ProductionItemId: 2, StockItemId: 2},
]

/*
console.log(1);

Reserve.createReserve(reserves).then(output => {
    console.log(10);
    console.log(output);
}).catch(err => {
    console.error(err);
})

Reserve.createReserve([{ProductionItemId: 7, StockItemId: 1, cost: "800", quantity: 3, supplier: "T.M.I.", production: true}]).then(output => {
    console.log(output)
}).catch(err => {
    console.error(err);
})

ItemCategory.findAll({
    where: {
        name: "GI Steel Coil"
    },
    include: [
        {model: Attribute},
        {model: StockItem, 
        include: [
            {model: ItemAttribute, order: [Attribute, "position", "ASC"],
            }
        ]},
    ],
    order: [[Attribute, "position", "ASC"]]
}).then(found => {
    console.log(found[0].Stock_Items[0].Item_Attributes);
})
*/

export default app;
