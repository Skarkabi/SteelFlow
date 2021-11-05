import 'dotenv';
import Sequelize from 'sequelize';

const dbName = 'steel_flow';
const dbUserName = 'saleemkarkabi';
const dbPort = '5432';

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mySQLDB = new Sequelize(dbName, dbUserName,process.env.DB_PASSWORD, {
    host: "localhost",
    port: dbPort,
    dialect: 'postgres',
});

mySQLDB.sync().then(() => {
    console.log(`Database & tables created!`)
}).catch(err => {
    console.log("TESTT IS: " + err);
console.log(process.env.DB_PASSWORD);
    console.log(`Could not connect to database ${err}`);
});

export default mySQLDB;
