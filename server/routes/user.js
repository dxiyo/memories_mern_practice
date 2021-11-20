import express from 'express'
import UserController from '../controllers/UserController.js'
const router = express.Router()

router.post('/signin', UserController.signIn)
router.post('/signup', UserController.signUp)


export default router