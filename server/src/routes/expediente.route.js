import { Router } from "express"
import { 
    createMethod, 
    updateMethod
} from "../controllers/methods.controllers.js"
import {isAdmin, verifyToken} from "../middlewares/authJwt.js"

const router = Router()

router.post('/expediente/:table_name',verifyToken , createMethod)
router.put('/expediente/:table_name/:id',verifyToken , updateMethod)

export default router