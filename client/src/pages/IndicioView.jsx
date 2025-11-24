import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function IndicioView(){
  let { expedienteId } = useParams();
  const [indicios, setIndicios] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [tecnicos, setTecnicos] = useState([]);
  const [form, setForm] = useState({
    id:0,
    descripcion:"",
    color:"",
    tamano:"",
    peso:0.0,
    ubicacion:"",
    creado_en:"",
    tecnico_id:0,
    tipo:""}

  );

  useEffect(()=>{
    async function load(){
      try{
        const token = localStorage.getItem('token');
        if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//        const res = await api.get(`/route_method/indicios/${expedienteId}`);
        const res = await api.get(`/indicio/${expedienteId}`);
        setIndicios(res.data);

        const resTec = await api.get('/route_method/usuarios');
        setTecnicos(resTec.data)

        console.log(indicios)
      }catch(err){ console.error(err); }
    }
    load();
  },[]);
  
  function getTecnico(id){
    const tecnico = tecnicos.find(tecnico => tecnico.id === id);

    console.log(tecnico)
    
    if(tecnico !== undefined){
      return tecnico.nombre + ' ' + tecnico.apellido
    }
  };

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const cancelApprove = () => {
    setShowApproveModal(false);
    // Resetear formulario al cancelar
    setForm({
      id: 0,
      descripcion: "",
      color: "",
      tamano: "",
      peso: 0.0,
      ubicacion: "",
      creado_en: "",
      tecnico_id: 0,
      tipo: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const confirmApprove = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Preparar datos para enviar
      const indicioData = {
        descripcion: form.descripcion,
        color: form.color,
        tamano: form.tamano,
        peso: parseFloat(form.peso),
        ubicacion: form.ubicacion,
        tecnico_id: parseInt(form.tecnico_id),
        tipo: form.tipo,
        expediente_id: expedienteId ? parseInt(expedienteId) : null
      };

      await api.post('/indicio/indicios', indicioData);
      
      // Recargar la lista de indicios
      const res = await api.get(`/indicio/${expedienteId}`);
      setIndicios(res.data);
      
      setShowApproveModal(false);
      
      // Limpiar formulario
      setForm({
        id: 0,
        descripcion: "",
        color: "",
        tamano: "",
        peso: 0.0,
        ubicacion: "",
        creado_en: "",
        tecnico_id: 0,
        tipo: ""
      });
      
    } catch (error) {
      console.error('Error al crear indicio:', error);
      alert('Error al crear el indicio. Por favor, intente nuevamente.');
    }
  };

  return (
     <div className='container'>
      
      {showApproveModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Indicio</h5>                
                <button type="button" className="close" onClick={cancelApprove}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={confirmApprove}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Descripción *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="descripcion"
                          value={form.descripcion} 
                          onChange={handleInputChange} 
                          placeholder="Descripción del indicio" 
                          required 
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Color</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="color"
                          value={form.color} 
                          onChange={handleInputChange} 
                          placeholder="Color del indicio" 
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Tamaño</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="tamano"
                          value={form.tamano} 
                          onChange={handleInputChange} 
                          placeholder="Tamaño del indicio" 
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Peso </label>
                        <input 
                          type="number" 
                          step="0.01"
                          className="form-control" 
                          name="peso"
                          value={form.peso} 
                          onChange={handleInputChange} 
                          placeholder="0.00" 
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Ubicación</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="ubicacion"
                          value={form.ubicacion} 
                          onChange={handleInputChange} 
                          placeholder="Ubicación del indicio" 
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Técnico *</label>
                        <select 
                          className="form-control" 
                          name="tecnico_id"
                          value={form.tecnico_id} 
                          onChange={handleInputChange} 
                          required
                        >
                          <option value="">Seleccionar técnico</option>
                          {tecnicos
                          .filter(tecnico => tecnico.role === 'TECNICO')
                          .map(tecnico => (
                            <option key={tecnico.id} value={tecnico.id}>
                              {tecnico.nombre} {tecnico.apellido}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Tipo de Prueba *</label>
                        <select 
                          className="form-control" 
                          name="tipo"
                          value={form.tipo} 
                          onChange={handleInputChange} 
                          required
                        >
                          <option value="">Seleccionar tipo</option>
                          <option value="MATERIAL">Material</option>
                          <option value="DIGITAL">Digital</option>
                          <option value="OTRO">Otro</option>                          
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {expedienteId && (
                    <div className="alert alert-info">
                      <small>Este indicio se asociará al expediente: {expedienteId}</small>
                    </div>
                  )}
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cancelApprove}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                      Guardar Indicio
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h2>Expedientes</h2>
      <Navbar /> 
      
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleApprove}>
        Nuevo Indicio
      </button>

      <table className='table'>
        <thead><tr><th>ID</th><th>Descripción</th><th>Color</th><th>Tamaño</th><th>Peso</th><th>Ubicación</th><th>Fecha</th><th>Técnico</th><th>Tipo Prueba</th></tr></thead>
        <tbody>
          {indicios.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.descripcion}</td>
              <td>{e.color}</td>
              <td>{e.tamano}</td>
              <td>{e.peso}</td>
              <td>{e.ubicacion}</td>
              <td>{e.creado_en ? new Date(e.creado_en).toLocaleString() : ''}</td>
              <td>{getTecnico(e.tecnico_id)}</td>
              <td>{e.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>    
  );
}
