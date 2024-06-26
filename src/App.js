import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReservationForm from './components/ReservationForm';
import ReservationsList from './components/ReservationsList';
import MyCalendar from './components/Calendar';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Sistema de Reservas</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ReservationForm />
        </Col>
        <Col md={6}>
          <MyCalendar />
        </Col>
      </Row>
      <Row>
        <Col>
          <ReservationsList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
