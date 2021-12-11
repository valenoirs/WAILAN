const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Post
router.post('/login', UserController.Login);
router.post('/register', UserController.Register);

// Logout
router.get('/logout', UserController.Logout);

// Get
router.get('/login', (req, res) => {
    if(!req.session.idUser){
        res.render('user/login', {title: 'Login', layout: 'layouts/user-layout'});
    }
    else{
        res.redirect('/');
    }
});

router.get('/register', (req, res) => {
    if(!req.session.idUser){
        res.render('user/register', {title: 'Register', layout: 'layouts/user-layout'});
    }
    else{
        res.redirect('/');
    }
});

router.get('/ticket', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/ticket', {title: 'Ticket', layout: 'layouts/user-layout'});
    }
})

router.get('/submit', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/submit', {title: 'Submit', layout: 'layouts/user-layout'});
    }
})

router.get('/', (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        res.render('user/home',  {title: 'Home', layout: 'layouts/user-layout'});
    }
});

module.exports = router;