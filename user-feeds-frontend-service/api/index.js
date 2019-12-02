const express = require('express')
const router = express.Router()

require('./routes/feeds')(router)

module.exports = router