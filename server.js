'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const _ = require("lodash");
const cors = require('cors')
const errorTemplate = require('./utils/errorTemplate');
const errorCodes = require('./utils/errorCodes')();
const authUtils = require("./utils/authUtils");
const app = express();
const V1_PATH = '/api/v1';
process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
let err;

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.end('Welcome to bFinance!');
});

app.use(V1_PATH, require(path.join(__dirname, './router')));

app.use((req, res, next) => {
    err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    err.code = errorCodes.NOT_FOUND;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    let error = errorTemplate(err)
    console.log(error);
    res.json(error);
});

const models = require('./models');
// authenticate database
models.sequelize.authenticate().then(() => {
    console.log('DB Connection has been established successfully.');
    return models.sequelize.sync().then(() => {
        console.log(`Models synced successfully!`);
        startServer();
    }).catch(err => {
        console.log(`Unable to sync sequelize: ${err}`);
    })
}).catch(err => {
    console.log('Unable to connect to the database:', err);
});


const startServer = () => {
    app.listen(PORT, () => {
        console.log(
            `Express Server started on Port ${app.get(
                'port'
            )} | Environment : ${app.get('env')}`
        );
    });
}