import React, { useState } from "react";
import "./AddUserTask.css";

function AddUserTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("");
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const statuses = ["unfinished", "finished", "in progress"];
  
  const dateTimeStates = [
    { state: fromDateTime, setState: setFromDateTime, placeholder: "From" },
    { state: toDateTime, setState: setToDateTime, placeholder: "To" },
  ];

  const handleDateTimeChange = (setState, value) => {
    setState(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromDate = new Date(fromDateTime);
    const toDate = new Date(toDateTime);

    if (fromDate >= toDate) {
      setErrorMessage("Start date and time must be earlier than end date and time.");
      return;
    }

    onAdd({ title, detail, status, fromDateTime, toDateTime });
    setTitle("");
    setDetail("");
    setStatus("");
    setFromDateTime("");
    setToDateTime("");
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Task</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="container">
        <div className="date-time">
          {dateTimeStates.map((item, index) => (
            <div key={index}>
              {item.placeholder}:
              <input
                type="datetime-local"
                value={item.state}
                onChange={(e) => handleDateTimeChange(item.setState, e.target.value)}
                placeholder={item.placeholder}
              />
            </div>
          ))}
          <div className="statuses">
            {statuses.map((state, index) => (
              <div className={`status ${state}`} key={index}>
                <input
                  type="checkbox"
                  id={state}
                  name="status"
                  value={state}
                  checked={status === state}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor={state}></label>
                <p className="status-label">
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="labels">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="detail-area"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Detail"
          />
        </div>
      </div>
      <button className="add-button" type="submit">
        Submit!!!
      </button>
    </form>
  );
}

export default AddUserTask;
