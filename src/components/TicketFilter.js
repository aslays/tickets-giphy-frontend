import React, { useState } from 'react';

const TicketFilter = ({ onFilter }) => {
  const [status, setStatus] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter({ status, difficulty, startDate, endDate });
  };

  return (
    <div className="ticket-filter mb-4">
      <h4>Filtrar Tickets</h4>
      <div className="row align-items-end">
        {/* Filtro de Estado */}
        <div className="form-group col-md-5">
          <label htmlFor="status">Estado</label>
          <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="Pending">Pendiente</option>
            <option value="Completed">Completado</option>
          </select>
        </div>

        {/* Filtro de Dificultad */}
        <div className="form-group col-md-5">
          <label htmlFor="difficulty">Dificultad</label>
          <select className="form-control" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Todas</option>
            <option value="Easy">Fácil</option>
            <option value="Medium">Medio</option>
            <option value="Hard">Difícil</option>
          </select>
        </div>
        
        <div className="col-md-2 d-flex justify-content-center">
          <button className="btn btn-primary mt-2" onClick={handleFilter}>
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketFilter;
