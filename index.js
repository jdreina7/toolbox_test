import express from 'express'

import router from './routes/router.js'

import { GENERAL_404_ERROR, SUCCESS_SERVER_EXECUTION_MESSAGE } from './utils/contants.js'

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
