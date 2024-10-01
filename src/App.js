import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketListPage from './components/TicketListPage';
import TicketForm from './components/TicketForm';
import { getTickets } from './services/ticketService';

function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);

  // Refrescar la lista de tickets
  const refreshTickets = async (filters = {}) => {
    try {
      const response = await getTickets(filters);
      setTickets(response.data);
    } catch (error) {
      console.error('Error al obtener los tickets', error);
    }
  };

  useEffect(() => {
    refreshTickets();
  }, []);

  return (
    <Router basename="/">
      <div className="container">
        <h1 className="text-center my-4">Gestión de Tickets con Giphy</h1>
        <Routes>
          <Route
            path="/"
            element={
              <TicketListPage
                tickets={tickets}
                refreshTickets={refreshTickets}
                setCurrentTicket={setCurrentTicket}
              />
            }
          />
          <Route
            path="/create"
            element={<TicketForm refreshTickets={refreshTickets} />}
          />
          <Route
            path="/edit/:id"
            element={
              <TicketForm
                currentTicket={currentTicket}
                refreshTickets={refreshTickets}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
