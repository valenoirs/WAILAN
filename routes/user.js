const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/login', (req, res) => {
    res.render('user/login', {title: 'Login', layout: 'layouts/user-layout'});
});

module.exports = router;