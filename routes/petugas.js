const express = require('express');
const router = express.Router();
const PetugasController = require('../controllers/user');

router.get('/login', (req, res) => {
    res.render('petugas/login', {title: 'Login - Petugas', layout: 'layouts/petugas-layout'});
});

module.exports = router;