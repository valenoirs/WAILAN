// Requiring module, packages, etc.
const Joi = require('joi');
const {v4: uuidv4} = require('uuid')

const comparePassword = require('../utils/comparePassword');
const hashPassword = require('../utils/hashPassword');

// Importing Model
const User = require('../models/user');

// Validate User
const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    birth: Joi.date().required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

module.exports.Register = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user){
            console.log('User with same email found!');
            req.session.error = ('Email telah terdaftar!');
            return res.redirect('/register');
        }

        if(req.body.password !== req.body.confirmPassword){
            console.log('Password validation error!')
            req.session.error = ('Konfirmasi password salah!');
            return res.redirect('/register');
        }

        const hash = await hashPassword(req.body.password);

        delete req.body.confirmPassword;

        req.body.idUser = uuidv4();
        req.body.password = hash;

        const newUser = new User(req.body);
        await newUser.save();

        console.log(newUser);
        console.log('User added!');

        return res.redirect('/login');

    }
    catch (error) {
        console.error('register-error', error);
        req.session.error = "Register Error";
        return res.redirect('/register');
    }
};

exports.Login = async (req, res, next) => {
    try {
        // Find user
        const user = await User.findOne({email: req.body.email});

        // User validation
        if(!user){
            console.log('User not found!');
            req.session.error = 'Email salah!';
            return res.redirect('/login');
        }

        // Password validation
        passwordValid = comparePassword(req.body.password, user.password);

        if(!passwordValid){
            console.log('Password invalid!');
            console.log('Password salah');
            return res.redirect('/login');
        }

        // Success
        req.session.idUser = user.idUser;
        req.session.namaUser = user.nama;

        console.log('Logged in!');
        return res.redirect('/');
    }
    catch (error) {
        console.error('login-error', error);
        req.session.error = "Login Error";
        return res.redirect('/login');
    }
};

exports.Logout = async (req, res, next) => {
    try{
        delete req.session.idUser;
        delete req.session.namaUser;

        return res.redirect('/login');
    }
    catch (error){
        console.error('logout-error', error);
        return res.redirect('/');
    }
};