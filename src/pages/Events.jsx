import React, { useEffect, useState } from "react";
import { getEvents } from "../services/githubApi";

const Events = ({ username }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (username) {
      getEvents(username)
        .then((res) => setEvents(res.data))
        .catch(console.error);
    }
  }, [username]);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;