import express from 'express'
import { handleFilesData } from '../controllers/filesController.js'

const router = express.Router()

router.get('/data', handleFilesData)

export default router
