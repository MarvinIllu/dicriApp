import { sql, Int, Schema, model, DateTime} from 'mssql'

const userSchema = new  sql.Schema({
    username:{
        type: String,
        unique: true
    },
    passwordHash:{
        type: String,        
    },
    email:{
        type: String,
        unique: true
    },
    nombre:{
        type: String,        
    },
    apellido:{
        type: String,
        unique: true
    },
    creado_en:{
        type: DateTime,
    },
    rolesId:[{
        type: Int
    }]
})

export default model('User', userSchema)