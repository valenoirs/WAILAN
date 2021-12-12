const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket');

// #region User
// Post
router.post('/', TicketController.Submit);
router.post('/cancel', TicketController.Cancel);
// #endregion

// #region Petugas
// Post
router.post('/approve', TicketController.Approve)
router.post('/decline', TicketController.Decline)
// #endregion

module.exports = router;