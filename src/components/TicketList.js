import React from 'react';
import { useNavigate } from 'react-router-dom';  
import { deleteTicket, updateTicketStatus } from '../services/ticketService';  

const TicketList = ({ onEditTicket, tickets, refreshTickets }) => {
  const navigate = useNavigate();  

  const handleStatusChange = async (id, status) => {
    try {
      await updateTicketStatus(id, { status });
      refreshTickets();
    } catch (error) {
      console.error('Error al actualizar el estado del ticket', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      refreshTickets();
    } catch (error) {
      console.error('Error al eliminar el ticket', error);
    }
  };

  const handleEdit = (ticket) => {
    onEditTicket(ticket);
    navigate(`/edit/${ticket.id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Listado de Tickets</h2>
      <div className="row">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div className="col-md-3 col-sm-6 mb-4" key={ticket.id}> 
              <div className="card h-100">
                <img src={ticket.gifUrl} className="card-img-top" alt="Gif relacionado" />
                <div className="card-body">
                  <h5 className="card-title">{ticket.name}</h5>
                  <p className="card-text">{ticket.description}</p>
                  <p className="card-text">
                    <strong>Dificultad:</strong> {ticket.difficulty}
                  </p>
                  <p className="card-text">
                    <strong>Estado:</strong>
                    <select 
                      value={ticket.status} 
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className="form-control"
                    >
                      <option value="Pending">Pendiente</option>
                      <option value="Completed">Completado</option>
                    </select>
                  </p>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(ticket)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay tickets disponibles</p>
        )}
      </div>
    </div>
  );
};

export default TicketList;
