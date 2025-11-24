import { Router } from "express"
import { 
    createMethod, 
    updateMethod
} from "../controllers/methods.controllers.js"
import {isAdmin, verifyToken} from "../middlewares/authJwt.js"
import {getIndicioByExpedienteId} from '../controllers/indicios.controllers.js'


const router = Router()

router.post('/indicio/:table_name' ,verifyToken, createMethod)
router.put('/indicio/:table_name/:id',verifyToken , updateMethod)
router.get('/indicio/:expediente_id',verifyToken, getIndicioByExpedienteId)

export default router