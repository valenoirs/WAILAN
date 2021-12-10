const mongoose = require('mongoose');

const Chatroom = mongoose.model('Chatroom', new mongoose.Schema({
    idChatroom: {type: String,  required: true, unique: true},
    idUser: {type: String,  required: true},
    idPetugas: {type: String,  required: true},
    pesan: {type:Array},
    
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Chatroom;