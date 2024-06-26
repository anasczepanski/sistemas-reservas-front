import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas') // Atualize o URL conforme necessário
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => console.error('Erro ao buscar reservas:', error));
  }, []);

  const handleCancel = (id) => {
    axios.delete(`http://localhost:3000/api/reservas/${id}`) // Atualize o URL conforme necessário
      .then(response => {
        setReservations(reservations.filter(reserva => reserva._id !== id));
      })
      .catch(error => console.error('Erro ao cancelar reserva:', error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Espaço</th>
          <th>Data</th>
          <th>Horas</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(reserva => (
          <tr key={reserva._id}>
            <td>{reserva.espaco.nome}</td>
            <td>{new Date(reserva.dataInicio).toLocaleDateString()}</td>
            <td>{reserva.horas.join(', ')}</td>
            <td>
              <Button variant="danger" onClick={() => handleCancel(reserva._id)}>Cancelar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ReservationsList;
