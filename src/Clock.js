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

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return (
    <div className="clock">
      <h2>{date.toLocaleDateString()}</h2>
      <h3>{`${hours} : ${minutes} : ${seconds}`}</h3>
    </div>
  );
}

export default Clock;
