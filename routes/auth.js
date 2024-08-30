const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findUserByEmail, addUser } = require('../models/User');

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (findUserByEmail(email)) {
        errors.push({ msg: 'Email is already registered' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, username, email, password, password2 });
    } else {
        addUser({ username, email, password });
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/login');
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/countdowns/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;
