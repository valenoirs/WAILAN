const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket');

// Post
router.post('/', TicketController.Submit);

module.exports = router;