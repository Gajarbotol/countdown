const express = require('express');
const router = express.Router();
const { findCountdownsByUserId, addCountdown, findCountdownById, updateCountdown, deleteCountdown } = require('../models/Countdown');
const { ensureAuthenticated } = require('../config/auth');

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    const countdowns = findCountdownsByUserId(req.user.id);
    res.render('dashboard', { countdowns });
});

// Create new countdown
router.post('/add', ensureAuthenticated, (req, res) => {
    const { name, date } = req.body;
    addCountdown({ name, date, userId: req.user.id });
    req.flash('success_msg', 'Countdown added');
    res.redirect('/countdowns/dashboard');
});

// Edit countdown
router.post('/edit/:id', ensureAuthenticated, (req, res) => {
    const { name, date } = req.body;
    const countdown = findCountdownById(req.params.id);
    if (countdown && countdown.userId === req.user.id) {
        updateCountdown({ id: countdown.id, name, date, userId: req.user.id });
        req.flash('success_msg', 'Countdown updated');
    }
    res.redirect('/countdowns/dashboard');
});

// Delete countdown
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    const countdown = findCountdownById(req.params.id);
    if (countdown && countdown.userId === req.user.id) {
        deleteCountdown(req.params.id);
        req.flash('success_msg', 'Countdown deleted');
    }
    res.redirect('/countdowns/dashboard');
});

module.exports = router;
