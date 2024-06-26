import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function SpacesManagement() {
  const [spaces, setSpaces] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    axios.get('/api/espacos')
      .then(response => setSpaces(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpace = { nome: name, capacidade: capacity };
    axios.post('/api/espacos', newSpace)
      .then(response => {
        console.log('Espaço criado:', response.data);
        setSpaces([...spaces, response.data]);
      })
      .catch(error => console.error('Error creating space:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/espacos/${id}`)
      .then(response => {
        console.log('Espaço deletado:', response.data);
        setSpaces(spaces.filter(space => space._id !== id));
      })
      .catch(error => console.error('Error deleting space:', error));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome do Espaço</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Capacidade</Form.Label>
          <Form.Control type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Adicionar Espaço</Button>
      </Form>
      <ListGroup>
        {spaces.map(space => (
          <ListGroup.Item key={space._id}>
            {space.nome} - Capacidade: {space.capacidade}
            <Button variant="danger" onClick={() => handleDelete(space._id)}>Deletar</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SpacesManagement;
