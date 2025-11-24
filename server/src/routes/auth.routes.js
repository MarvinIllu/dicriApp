import { Router } from "express"
import * as auth from '../controllers/auth.controllers.js'

const router = Router()

router.post('/login', auth.login)
router.post('/logout', auth.logout)

export default router