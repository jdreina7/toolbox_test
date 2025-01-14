import express from 'express'
import { getFilesData } from '../controllers/filesController.js'

const router = express.Router()

// Route to list all transformed data files
router.get('/data', getFilesData)

export default router
