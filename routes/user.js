const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Import Models
const Ticket = require('../models/ticket');
const Chatroom = require('../models/chatroom');

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

router.get('/ticket', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        const tickets = await Ticket.find({idUser: req.session.idUser});
        res.render('user/ticket', {title: 'Ticket', layout: 'layouts/user-layout', tickets});
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
})

router.get('/chatroom/:idChatroom', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        const chatroom = await Chatroom.findOne({idChatroom: req.params.idChatroom});
        res.render('user/chatroom', {title: 'Chatroom', layout: 'layouts/user-layout', chatroom});
    }
})

router.get('/ticket/:idTicket', async (req, res) => {
    if(!req.session.idUser){
        res.redirect('/login');
    }
    else{
        const ticket = await Ticket.findOne({idTicket: req.params.idTicket});
        res.render('user/detail', {title: 'Ticket', layout: 'layouts/user-layout', ticket});
    }
})

module.exports = router;