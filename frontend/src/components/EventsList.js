import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import ButtonJoin from './ButtonJoin';
import ParticipationsList from './ParticipationsList';

function EventCard({ event }) {
  const [showDetails, setShowDetails] = useState(false);
  const [sportOptions, setSportOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(event.sport_id);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const fetchSportOptions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/sports"); 
        const options = response.data.sports.map(({ id, name, sport_url }) => ({ value: id, label: name, pic: sport_url }));
        setSportOptions(options);
        console.log(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSportOptions();
  }, []);
  
  return (
    <div id='eventCard' onClick={handleCardClick}>
      {showDetails ? (
        <div id='participationsCard'>
          <h3>{event.event_name}</h3>
          <ButtonJoin eventId={event.id} />
          <ParticipationsList eventId={event.id} />
          <div className='date'>
            <p>📅{Moment(event.event_date).format('DD/MM/YYYY')}</p>
            <p>🕐{Moment(event.event_time).format('HH')}h{Moment(event.event_time).format('mm')}</p>
          </div>
        </div>
      ) : (
        <div id='infosCard'>
            <h3>{event.event_name}</h3>
          <div className='bodyCard'>
            <div className='sportText'>
              <p className='description'>{event.description}</p>
              <p className='localisation'>📍{event.location}</p>
            </div>
            <div className='sportPic'>
              {sportOptions.filter(option => option.value === selectedValue)
                          .map(option => option.label)}
              {sportOptions.filter(option => option.value === selectedValue)
              .map(option => {
                return <img src={option.pic} alt={option.label} />;
              })}
            </div>

          </div>
          <div className='date'>
            <p>📅{Moment(event.event_date).format('DD/MM/YYYY')}</p>
            <p>🕐{Moment(event.event_time).format('HH')}h{Moment(event.event_time).format('mm')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function EventsList() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/events', {
        headers: {
          Authorization: `${token}`,
        },
      });
      const sortedEvents = response.data.events.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      }).reverse();
      setEvents(sortedEvents);
      setParticipants(response.data.participants);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements :', error);
    }
  };
  

return (
    <div id='cardsContainer'>
      {events.map((event) => (
          <EventCard key={event.id} event={event} />
          ))}
    </div>
  );
}

export default EventsList;
