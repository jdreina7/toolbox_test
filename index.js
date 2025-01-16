const express = require('express')

const router = require('./routes/router.js')

const { GENERAL_404_ERROR, SUCCESS_SERVER_EXECUTION_MESSAGE } = require('./utils/contants.js')

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

// Routes
app.use('/files', router)

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: GENERAL_404_ERROR,
    status: 404
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`${SUCCESS_SERVER_EXECUTION_MESSAGE}${PORT}`)
})

module.exports = app
