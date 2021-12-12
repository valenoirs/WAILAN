const express = require('express');
const router = express.Router();
const PetugasController = require('../controllers/petugas');

// Import Models
const Ticket = require('../models/ticket');

// Post
router.post('/login', PetugasController.Login);
router.post('/register', PetugasController.Register);

// Logout
router.get('/logout', PetugasController.Logout);

// Get
router.get('/login', (req, res) => {
    if(!req.session.idPetugas){
        res.render('petugas/login', {title: 'Login - Petugas', layout: 'layouts/petugas-layout'});

    }
    else{
        res.redirect('/petugas');
    }
});

router.get('/register', (req, res) => {
    if(!req.session.idPetugas){
        res.render('petugas/register', {title: 'Register - Petugas', layout: 'layouts/petugas-layout'});
    }
    else{
        res.redirect('/petugas');
    }
});

router.get('/ticket', async (req, res) => {
    if(!req.session.idPetugas){
        res.redirect('/petugas/login');
    }
    else{
        const tickets = await Ticket.find()
        res.render('petugas/ticket', {title: 'Ticket', layout: 'layouts/petugas-layout', tickets});
    }
});

router.get('/ticket/approved', async (req, res) => {
    if(!req.session.idPetugas){
        res.redirect('/petugas/login');
    }
    else{
        const tickets = await Ticket.find({idPetugas: req.session.idPetugas, })
        res.render('petugas/ticket', {title: 'Ticket', layout: 'layouts/petugas-layout', tickets});
    }
});

router.get('/', (req, res) => {
    if(!req.session.idPetugas){
        res.redirect('/petugas/login');
    }
    else{
        res.render('petugas/home', {title: 'Home', layout: 'layouts/petugas-layout'});
    }
});

module.exports = router;