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
import Restrictions from './models/User/Restrictions';
import Users from './models/User/User';
import User from './models/User/User';

handlebars.registerHelper("counter", function (index){
    return index + 1;

});

handlebars.registerHelper("greaterThan", function(x, y){
    console.log(x)
    console.log(y)
    if(x > y){
        return true;
    }else{
        return false;
    }
})

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

handlebars.registerHelper("inarray", function(array, value){
    if(array){
        const found = array.find(arr => {
            return arr.id === value
        })
    
        return found
    }

    return false
    

})

handlebars.registerHelper("upperCaseFirst", function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  })
handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
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
const newRestriction = {
    user_id: "100944661",
    view_users: true,
    edit_users: true,
    view_production: true,
    edit_production: true,
    view_stock: true,
    edit_stock: true,
    view_material_request: true,
    edit_material_request: true,
    request_production: true,
    UserId: "100944661",
    edit_item_category: true
}

const secondRestriction = {
    user_id: "100944662",
    view_users: true,
    edit_users: true,
    view_production: true,
    edit_production: true,
    view_stock: true,
    edit_stock: true,
    view_material_request: true,
    edit_material_request: true,
    request_production: true,
    UserId: "100944662",
    edit_item_category: true
}

const secondUser = {
    id: "100944662",
    password: "123456789",
    email: "saleemkarkabi@cmail.carleton.ca",
    firstName: "Saleem",
    lastName: "Karkabi",
    jobTitle: "Cheif Executive Officer",
    division: "Administration",
    accountType: "admin",
    department: "Administration",
    managerId: "100944661",
    restrictions: secondRestriction
}

const newUser = {
    id: "100944661",
    password: "123456789",
    email: "saleemkarkabi@test.com",
    firstName: "John",
    lastName: "Karkabi",
    jobTitle: "Plant Engineer",
    division: "Mesh",
    accountType: "employee",
    department: "production",
    managerId: "100944661",
    restrictions: newRestriction
}

User.createUser(newUser).then(() => {
    User.createUser(secondUser).then(() => {
        console.log("Users Created")
    }).catch(err => {
        console.log(err)
    })

}).catch(err => {
    console.log(err)

})

*/


export default app;
