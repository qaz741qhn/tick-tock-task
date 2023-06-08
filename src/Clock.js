import React, { useEffect, useState } from 'react';
import './Clock.css';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div className="clock">
      <h2>{date.toLocaleDateString()}</h2>
      <h3>{date.toLocaleTimeString()}</h3>
    </div>
  );
}

export default Clock;
