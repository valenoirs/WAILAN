const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', new mongoose.Schema({
    idAdmin: {type: String,  required: true, unique: true},
    email: {type: String,  required: [true, 'Admin email required!'], unique: true},
    password: {type: String, required: [true, 'Admin password required!']},
    nama: {type: String,  required: [true, 'Admin nama required!']},
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Admin;