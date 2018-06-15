// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./config/main');
const User = require('./app/models/user');

app = express();

const PORT = process.env.PORT || 3000;

// configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize Passport for use
app.use(passport.initialize());

// connect to database via mongoose
mongoose.connect(config.database);

// Add defined Passport Strategy
require('./config/passport')(passport);

// Create API group routes & register New Users
const apiRoutes = express.Router();

// Home route
app.get('/', (req, res) => {
  res.send('Testing the home route')
});



// Server listen
const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});
