import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketFilter from './TicketFilter';
import TicketList from './TicketList';

const TicketListPage = ({ tickets, refreshTickets, setCurrentTicket }) => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/create');
  };

  return (
    <div>
      <TicketFilter onFilter={refreshTickets} />

      <div className="row my-4">
        <div className="col text-center">
          <button 
            className="btn btn-success btn-lg px-4 py-2 shadow" 
            onClick={handleCreateNew}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Crear Nuevo Ticket
          </button>
        </div>
      </div>

      <TicketList
        tickets={tickets}
        refreshTickets={refreshTickets}
        onEditTicket={setCurrentTicket}
      />
    </div>
  );
};

export default TicketListPage;
