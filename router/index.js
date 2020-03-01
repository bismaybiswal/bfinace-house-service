'use strict'
const event = require('./routes/event');
const auth = require('./routes/auth')
const transactions = require("./routes/transactions");

module.exports = [auth, event, transactions];
