const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors= require('cors')

const { database } = require('./keys');

// Intializations
const app = express();

var corsOptions ={
    origin:'*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Global variables
app.use((req, res, next) => {
  next();
});

// Routes
app.use('/invoices',require('./routes/invoices'));
app.use('/clients',require('./routes/clients'));
app.use('/products', require('./routes/products'));



// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});