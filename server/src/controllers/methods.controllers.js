import { getConnection } from '../database/connection.js'
import sql from 'mssql'

const paramTypes = {
    id: sql.Int,
    nombre: sql.NVarChar(100),
    descripcion: sql.NVarChar(20),
    email: sql.NVarChar(255),   
    activo: sql.Bit,
    fecha: sql.DateTime,
    numero_expediente: sql.VarChar(100),
    fecha_registro: sql.DateTime,
    tecnico_id: sql.Int,
    estado: sql.VarChar(50),
    justificacion_rechazo: sql.VarChar(1000),
    actializado_en: sql.DateTime,
    expediente_id: sql.Int,
    color: sql.VarChar(50),
    tamano: sql.VarChar(50),
    peso: sql.Decimal(10,2),
    ubicacion: sql.VarChar(100),
    tipo: sql.VarChar(20),
    coordinador_id: sql.Int,
    aprobado: sql.Bit,
    justificacion: sql.VarChar(1000),
}

export const getMethod = async (req, res) => {
    const pool = await getConnection()
    const tableName = req.params.table_name

    console.log(tableName)

    const result = await pool.request()
        .input('TableName', sql.NVarChar, tableName)
    .execute('SPS_GENERIC')

    res.json(result.recordset)
}

export const getMethodById = async (req, res) => {
    const pool = await getConnection()
    const tableName = req.params.table_name    

    const result = await pool.request()
        .input('id', sql.Int,req.params.id)
        .input('TableName', sql.NVarChar, tableName)
    .execute('SPS_GENERIC')

    console.log(result.recordset.length === 0)

    if(result.recordset.length === 0){
        return res.status(404).json({ message:  tableName + " no encontrado"})
    }else{
        return res.json(result.recordset)
    }
}

export const createMethod = async (req, res) => {   
    const params = req.body

    const tableName = req.params.table_name

    console.log(tableName)
    const tableSP = tableName.toUpperCase()
    const storeProcedure = 'SPIU_' + tableSP

    console.log(storeProcedure)

    const pool = await getConnection()

    const request = new sql.Request()

    Object.keys(params).forEach(key => {
            if (paramTypes[key]) {
                request.input(key, paramTypes[key], params[key]);
            }
        });

    const result = await request
    .execute(storeProcedure);

    res.json({
        id:result.recordset[0].id,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    })
}

export const updateMethod = async(req, res) => {
   const params = req.body

    const tableName = req.params.table_name

    console.log(tableName)
    const tableSP = tableName.toUpperCase()
    const storeProcedure = 'SPIU_' + tableSP
    const pool = await getConnection()
    const request = new sql.Request()

    console.log(storeProcedure)

    Object.keys(params).forEach(key => {
            if (paramTypes[key]) {
                request.input(key, paramTypes[key], params[key]);
            }
        });

    const result = await request
        .input('id', sql.Int,req.params.id)
    .execute(storeProcedure);

    res.json('Actualizado ' + tableName)
}

export const deleteMethod = async (req, res) => {
     try {
        const pool = await getConnection();
        const tableName = req.params.table_name

        console.log(tableName)      

        const result = await pool.request()
            .input("id", req.params.id)
            .input('TableName', sql.NVarChar, tableName)
        .execute('SPD_GENERIC');

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}