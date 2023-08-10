import express from 'express'
import { checkLogin, workerLogin, workerLogut } from '../Controllers/workerController.js';
const router = express.Router()

router.get('/checkLogin',checkLogin)
router.post('/login',workerLogin)
router.get('/logout',workerLogut)

export default router;
