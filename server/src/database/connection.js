import sql from 'mssql'

const dbSettings = {
    user: 'sa', 
    password : '12345',
    server: 'localhost',
    database: 'dicriDB',
    options: {
        encrypt: false, // Disable encryption
        trustServerCertificate: true
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)

        //const result = await pool.request().query("SELECT GETDATE()")
        //console.log(result)
        return pool
    } catch (error) {
        console.log(error)        
    }
}