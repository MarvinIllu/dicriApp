import { Router } from "express"
import { 
    getMethod, 
    getMethodById, 
    createMethod, 
    updateMethod, 
    deleteMethod 
} from "../controllers/methods.controllers.js"
import {isAdmin, verifyToken} from "../middlewares/authJwt.js"

const router = Router()

router.get('/route_method/:table_name',verifyToken, getMethod)

router.get('/route_method/:table_name/:id',verifyToken, getMethodById)

router.post('/route_method/:table_name',verifyToken, createMethod)

router.put('/route_method/:table_name/:id',verifyToken, updateMethod)

router.delete('/route_method/:table_name/:id',verifyToken, deleteMethod)

export default router