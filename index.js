'use strict'

/**
 * Dependencies
 */

const express = require('express')

/**
 * Constants
 */

const port = 8080

/**
 * Define app
 */

const app = express()

/**
 * Routes
 */

app.use('/', require('./routes/root_router'))

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app
