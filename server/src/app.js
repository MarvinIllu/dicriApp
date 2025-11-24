import express from 'express'
import methodsRoutes from './routes/methods.routes.js'
import authRoutes from './routes/auth.routes.js'
import expedienteRoutes from './routes/expediente.route.js'
import indicioRoutes from './routes/indicios.route.js'
import cors from 'cors'

const app = express()

//app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//app.use(auth)

app.use('/api/auth', authRoutes)
app.use('/api', methodsRoutes)
app.use('/api', expedienteRoutes)
app.use('/api', indicioRoutes)

export default app