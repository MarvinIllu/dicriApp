import { Bit, Int, Schema, model} from 'mssql'

const tipoIndicioSchema = new Schema({
    id: Int,
    descripcion: String,
    activo: Bit
},{
    timestamp: true,  
})

export default model('tipo_indicio', tipoIndicioSchema)