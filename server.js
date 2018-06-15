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

apiRoutes.post('/register', (req, res) => {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Save user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user'});
    });
  }
});

apiRoutes.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if(!user) {
      res.send({ success: false, message: 'Authentication failed. User not found'});
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(isMatch && !err) {
          // Create token if the password matched and no error thrown
          let token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // seconds
          });
          res.json({ success: true, token: `JWT ${token}`})
        } else {
          res.send({ success: false, message: 'Authentication failed, passwords did not match'})
        }
      });
    }
  });
});

// Protect dashboard route with JWT
apiRoutes.get('./dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Success. User id is ${req.user._id}.`);
});

// Set URL for API group routes
app.use('/api', apiRoutes)

// Home route
app.get('/', (req, res) => {
  res.send('Testing the home route')
});



// Server listen
const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});
