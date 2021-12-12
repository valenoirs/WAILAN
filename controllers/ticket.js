// Requiring module, packages, etc.
const {v4: uuidv4} = require('uuid')

// Import Models
const User = require('../models/user');
const Ticket = require('../models/ticket');
const Petugas = require('../models/petugas');

module.exports.Submit = async (req, res, next) => {
    console.log(req.body);
    try{
        const user = await User.findOne({idUser: req.body.idUser});
        console.log(user)

        req.body.nameUser = user.name;
        req.body.idTicket = uuidv4();

        const newTicket = new Ticket(req.body);
        await newTicket.save();

        console.log(newTicket);

        console.log('Ticket submitted!');
        return res.redirect('/')
    }
    catch(error){
        console.error('submit-ticket-error', error);
        req.session.error = 'Submit Ticket Error - Unknown Error';
        return res.redirect('/submit')
    }
};