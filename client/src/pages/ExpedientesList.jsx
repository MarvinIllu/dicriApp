import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ExpedientesList() {
  const [expedientes, setExpedientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [selectedExpedienteRechazo, setSelectedExpedienteRechazo] = useState(null);
  const [justificacionRechazo, setJustificacionRechazo] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('token');
        if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/route_method/expedientes');
        setExpedientes(res.data);

        console.log((res.data))

        const resTec = await api.get('/route_method/usuarios');
        setTecnicos(resTec.data)

        
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [refreshTrigger]);

  function getTecnico(id){
    const tecnico = tecnicos.find(tecnico => tecnico.id === id);
    
    if(tecnico !== undefined){
      return tecnico.nombre + ' ' + tecnico.apellido
    }
  }

  const handleApprove = (expediente,isRechazo) => {
    setSelectedExpediente(expediente);
    setSelectedExpedienteRechazo(isRechazo)
    setShowApproveModal(true);
  };

  const cancelApprove = () => {
    setShowApproveModal(false);
  };

  const confirmApprove = async () => {
    try {
      //e.preventDefault();
    
      const token = localStorage.getItem('token');
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.put(`/expediente/expedientes/${selectedExpediente.id}`, { 
        numero_expediente: selectedExpediente.numero_expediente, 
        justificacion_rechazo: justificacionRechazo, 
        estado: selectedExpedienteRechazo ? "RECHAZADO" : "APROBADO", 
        tecnico_id: 5 
       });
    
      setShowApproveModal(false);
      setJustificacionRechazo(''); // ← Limpiar justificación
      setRefreshTrigger(prev => prev + 1); // ← Trigger para refrescar los datos
    } catch (error) {
      console.error('Error al aprobar:', error);
    }
  };

  return (
    <div className='container'>
      
      {showApproveModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar {selectedExpedienteRechazo ? 'Rechazo ' : 'Aprobación'}</h5>                
                <button type="button" className="close" onClick={cancelApprove}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Está seguro que desea {selectedExpedienteRechazo ? 'rechazar ' : 'aprobar' } este expediente?</p>
                {selectedExpedienteRechazo ? 

                 <div>
                  <form onSubmit={confirmApprove}>
                    <label className="form-label">Justificación Rechazo</label>
                    <div><input className="form-control" value={justificacionRechazo} onChange={e=>setJustificacionRechazo(e.target.value)} placeholder="Justificación Rechazo" required/></div>
                  </form>
                </div>
              :''
              
              }
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelApprove}>
                  Cancelar
                </button>
                <button type="button" className={selectedExpedienteRechazo ? "btn btn-danger" : "btn btn-success" } onClick={confirmApprove}>
                  Sí, {selectedExpedienteRechazo ? 'Rechazar ' : 'Aprobar' }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h2>Expedientes</h2>
      <Navbar /> 
      
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <Link to={`/expediente/form`} style={{ textDecoration: 'none',  color: "#f5f5f5" }}>Nuevo Expediente</Link>
      </button>

      <table className='table'>
        <thead><tr><th>ID</th><th>Numero</th><th>Fecha</th><th>Ténico</th><th>Justificación Rechazo</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          {expedientes.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.numero_expediente}</td>
              <td>{e.fecha_registro ? new Date(e.fecha_registro).toLocaleString() : ''}</td>
              <td>{getTecnico(e.tecnico_id)}</td>
              <td>{e.justificacion_rechazo}</td>
              <td>{e.estado}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleApprove(e,false)}>Aprobar</button> | 
                <button className="btn btn-secondary"><Link to={`/indicio/form/${e.id}`} style={{ textDecoration: 'none',  color: "#f5f5f5" }}>Indicio</Link></button> |                
                <button className="btn btn-warning" onClick={() => handleApprove(e,true)}>Rechazar</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>    
  )
}