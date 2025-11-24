import { getConnection } from '../database/connection.js'
import sql from 'mssql'

export const getIndicioByExpedienteId = async (req, res) => {
    const pool = await getConnection()
    const expediente_id = req.params.expediente_id    

    const result = await pool.request()
        .input('expediente_id', sql.Int,expediente_id)
    .execute('SPS_INDICIOS')

    console.log(result.recordset.length === 0)

    if(result.recordset.length === 0){
        return res.status(404).json({ message:  " indicio no encontrado"})
    }else{
        return res.json(result.recordset)
    }
}