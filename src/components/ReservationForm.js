import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ReservationForm() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState([]);  // Adicionar o estado hours
  const [selectedHours, setSelectedHours] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/espacos') // Atualize o URL conforme necessário
      .then(response => {
        setSpaces(response.data);
      })
      .catch(error => console.error('Erro ao buscar espaços:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = { espacoId: selectedSpace, data: date, horas: selectedHours };
    axios.post('http://localhost:3000/api/reservas', newReservation) // Atualize o URL conforme necessário
      .then(response => {
        console.log('Reserva criada:', response.data);
        // Atualizar calendário ou lista de reservas se necessário
      })
      .catch(error => console.error('Erro ao criar reserva:', error));
  };

  const handleSpaceChange = (e) => {
    const spaceId = e.target.value;
    setSelectedSpace(spaceId);
    // Simular consulta de horas disponíveis para o espaço selecionado
    axios.get(`http://localhost:3000/api/espacos/${spaceId}/horas`) // Atualize o URL conforme necessário
      .then(response => {
        setSelectedHours([]);
        setHours(response.data);
      })
      .catch(error => console.error('Erro ao buscar horas disponíveis:', error));
  };

  const handleHourChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedHours(selected);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Espaço</Form.Label>
        <Form.Control as="select" value={selectedSpace} onChange={handleSpaceChange}>
          <option value="">Selecione um espaço</option>
          {spaces.map(space => (
            <option key={space._id} value={space._id}>{space.nome}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Data</Form.Label>
        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Horas Disponíveis</Form.Label>
        <Form.Control as="select" multiple value={selectedHours} onChange={handleHourChange}>
          {hours.map(hour => (
            <option key={hour} value={hour}>{hour}:00</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Reservar</Button>
    </Form>
  );
}

export default ReservationForm;
