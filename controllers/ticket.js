// Requiring module, packages, etc.
const {v4: uuidv4} = require('uuid');

// Import Models
const User = require('../models/user');
const Ticket = require('../models/ticket');
const Petugas = require('../models/petugas');

// #region User
module.exports.Submit = async (req, res, next) => {
    try{
        const user = await User.findOne({idUser: req.body.idUser});

        req.body.nameUser = user.name;
        req.body.idTicket = uuidv4();

        const newTicket = new Ticket(req.body);
        await newTicket.save();

        console.log(newTicket);

        console.log('Ticket submitted!');
        return res.redirect('/ticket')
    }
    catch(error){
        console.error('submit-ticket-error', error);
        req.session.error = 'Submit Ticket Error - Unknown Error';
        return res.redirect('/submit')
    }
};

module.exports.Cancel = async (req, res, next) => {
    try{
        const ticket = await Ticket.findOne({idTicket: req.body.idTicket});

        if(!ticket){
            console.log('404. Ticket not found!');
            req.session.error = 'Ticket tidak ditemukan!';
            return res.redirect('/ticket');
        }

        await Ticket.updateOne({idTicket: req.body.idTicket}, {
            $set : {
                status: 'Dibatalkan'
            }
        })

        console.log('Ticket canceled!');
        return res.redirect('/ticket');
    }
    catch(error){
        console.error('cancel-ticket-error', error);
        req.session.error = 'Cancel Ticket Error - Unknown Error';
        return res.redirect('/ticket')
    }
};

// #endregion

// #region Petugas
exports.Approve = async (req, res, next) => {
    try{
        const ticket = await Ticket.findOne({idTicket: req.body.idTicket});
        const petugas = await Petugas.findOne({idPetugas: req.session.idPetugas});

        if(!ticket){
            console.log('404. Ticket not found!');
            req.session.error = 'Ticket tidak ditemukan!';
            return res.redirect('/petugas/ticket');
        }

        await Ticket.updateOne({idTicket: req.body.idTicket}, {
            $set : {
                idPetugas: req.session.idPetugas,
                namePetugas: petugas.name,
                status: 'Diterima'
            }
        })

        console.log('Ticket approved!');
        return res.redirect('/petugas/ticket');
    }
    catch(error){
        console.error('approve-ticket-error', error);
        req.session.error = 'Approve Ticket Error - Unknown Error';
        return res.redirect('/petugas/ticket');
    }
}

exports.Decline = async (req, res, next) => {
    try{
        const ticket = await Ticket.findOne({idTicket: req.body.idTicket});
        const petugas = await Petugas.findOne({idPetugas: req.session.idPetugas});

        if(!ticket){
            console.log('404. Ticket not found!');
            req.session.error = 'Ticket tidak ditemukan!';
            return res.redirect('/petugas/ticket');
        }

        await Ticket.updateOne({idTicket: req.body.idTicket}, {
            $set : {
                idPetugas: req.session.idPetugas,
                namePetugas: petugas.name,
                status: 'Ditolak'
            }
        })

        console.log('Ticket declined!');
        return res.redirect('/petugas/ticket');
    }
    catch(error){
        console.error('decline-ticket-error', error);
        req.session.error = 'Decline Ticket Error - Unknown Error';
        return res.redirect('/petugas/ticket')
    }
}
// #endregion