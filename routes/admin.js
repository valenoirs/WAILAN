const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

// Import Models

// Get
router.get('/login', (req, res) => {
    if(!req.session.idAdmin){
        res.render('admin/login', {title: 'Login - Admin', layout: 'layouts/admin-layout'});

    }
    else{
        res.redirect('/admin');
    }
});

router.get('/register', (req, res) => {
    if(!req.session.idAdmin){
        res.render('admin/register', {title: 'Register - Admin', layout: 'layouts/admin-layout'});
    }
    else{
        res.redirect('/admin');
    }
});

router.get('/', (req, res) => {
    if(!req.session.idAdmin){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/home', {title: 'Home', layout: 'layouts/admin-layout'});
    }
});

module.exports = router;