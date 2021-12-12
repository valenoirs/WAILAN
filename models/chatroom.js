const mongoose = require('mongoose');

const Chatroom = mongoose.model('Chatroom', new mongoose.Schema({
    idChatroom: {type: String,  required: true, unique: true},
    disabled: {type:Boolean, required: true, default: false},
    pesan: {type:String, required:true},
    // pesan: {type:Array},
    // pesan: new mongoose.Schema({
    //     pesan:
    // }),
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Chatroom;