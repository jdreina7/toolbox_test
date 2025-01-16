const express = require('express')
const { fetchAllFiles, handleFilesData } = require('../controllers/filesController.js')

const router = express.Router()

router.get('/data', handleFilesData)
router.get('/list', fetchAllFiles)

module.exports = router
