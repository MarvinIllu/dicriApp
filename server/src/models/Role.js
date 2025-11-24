import { DateTime, Int, Schema, model} from 'mssql'

const roleSchema = new Schema({
    nombre:{
        type: String,
    },
    activo:{
        type: Bit,
    }
})

export default mode('Role', roleSchema)