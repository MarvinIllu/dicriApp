import { getConnection } from '../database/connection.js'
import sql from 'mssql'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    //console.log(req.body.passwordHash)
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(req.body.passwordHash, salt)

    //console.log("passwordHash " + passwordHash)

    const pool = await getConnection()
    const result = await pool.request()
        .input('username', sql.NVarChar, req.body.username)
    .execute('SPS_USUARIOS')

    if(result.recordset.length === 0){
        return res.status(404).json({ message:  " Usuario / yo contraseña no es valido"})
    }else{        
        const user = result.recordset[0]
        const esValido = await bcrypt.compare(req.body.passwordHash, user.passwordHash)

        //console.log(esValido)
        if(!esValido){
            return res.status(404).json({ message:  " Usuario / yo contraseña no es valido"})
        }

        const token = jwt.sign({id: user.id, role: user.role}, "123456",{
            expiresIn: 3600
        })

        res.json({'id': user.id, 'token' : token})
    }
}

export const logout = async (req, res) => {}