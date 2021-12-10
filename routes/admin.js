const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

router.get('/login', (req, res) => {
    res.render('admin/login', {title: 'Login - Admin', layout: 'layouts/admin-layout'});
});

module.exports = router;