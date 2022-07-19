const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const app = express();
const cors = require('cors')

//importing routes
const customerRoutes = require('./routes/products');

// settings
app.set('port', process.env.PORT || 9000);

// middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(myConnection(mysql, {
    host: 'localhost',
    database: 'televisa-capturas-BD',
    user: 'root',
    password: ''
}, 'single'));

// routes
app.use('/', customerRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});