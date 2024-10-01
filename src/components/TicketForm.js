import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket, updateTicket } from '../services/ticketService';
import { updateTicketStatus } from '../services/ticketService';

const TicketForm = ({ currentTicket, refreshTickets }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'Easy',
    status: 'Pending' 
  });

  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      difficulty: 'Easy',
      status: 'Pending' 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTicket) {
        await updateTicket(currentTicket.id, formData);
        await updateTicketStatus(currentTicket.id, { status: formData.status });
      } else {
        await createTicket(formData);
      }
      await refreshTickets();
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error al crear o actualizar el ticket', error);
    }
  };

  useEffect(() => {
    if (currentTicket) {
      setFormData(currentTicket);
    }
  }, [currentTicket]);

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 shadow-sm bg-light rounded">
      <div className="form-group mb-4">
        <label htmlFor="name">Nombre del Ticket</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Nombre del Ticket"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="description">Descripción</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          placeholder="Descripción del Ticket"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="difficulty">Nivel de Dificultad</label>
        <select
          className="form-control"
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
        >
          <option value="Easy">Fácil</option>
          <option value="Medium">Medio</option>
          <option value="Hard">Difícil</option>
        </select>
      </div>

      
      <div className="form-group mb-4">
        <label htmlFor="status">Estado del Ticket</label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={formData.status} 
          onChange={handleInputChange}
        >
          <option value="Pending">Pendiente</option>
          <option value="Completed">Completado</option>
        </select>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          {currentTicket ? 'Actualizar Ticket' : 'Crear Ticket'}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
