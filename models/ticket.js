const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
    idTicket: {type: String,  required: true, unique: true},
    idUser: {type: String,  required: true},
    nama: {type: String,  required: true},
    judul: {type: String,  required: true},
    idPetugas: {type: String,  required: true, default: null},
    keterangan: {type: String,  required: true},
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Ticket;