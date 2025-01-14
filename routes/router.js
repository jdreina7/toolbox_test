import express from 'express'
import { fetchAllFiles, handleFilesData } from '../controllers/filesController.js'

const router = express.Router()

router.get('/data', handleFilesData)
router.get('/list', fetchAllFiles)

export default router
