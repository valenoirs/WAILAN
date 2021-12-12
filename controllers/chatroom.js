// Import Models
const Chatroom = require('../models/chatroom');

module.exports.Send = async (req, res, next) => {
    try{
        const chatroom = await Chatroom.updateOne({idChatroom: req.body.idChatroom}, {
            $push: {
                pesan: req.body
            }
        })

        console.log('Message sent!');
        return res.redirect('back');
    }
    catch(error){
        console.error('decline-ticket-error', error);
        req.session.error = 'Decline Ticket Error - Unknown Error';
        return res.redirect('back')
    }
}