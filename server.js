// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');

app = express();

const PORT = process.env.PORT || 3000;

// configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Home route
app.get('/', (req, res) => {
  res.send('Testing the home route')
});



// Server listen
const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});
