import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas') // Atualize o URL conforme necessário
      .then(response => {
        const reservas = response.data.map(reserva => ({
          title: reserva.espaco.nome,
          start: new Date(reserva.dataInicio),
          end: new Date(reserva.dataFim),
        }));
        setEvents(reservas);
      })
      .catch(error => console.error('Erro ao buscar reservas:', error));
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}

export default MyCalendar;
