const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const { database } = require('./keys');

// Intializations
const app = express();



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
// app.use('/user', require('./routes/user'));
// app.use('/admin',require('./routes/admin'));



// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});