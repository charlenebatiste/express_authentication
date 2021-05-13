const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});


// GET ROUTE TO RENDER LOGIN PAGE

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST ROUTE

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));




module.exports = router;
