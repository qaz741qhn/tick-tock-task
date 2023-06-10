import React, { useState } from "react";
import "./AddUserTask.css";

function AddUserTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("");
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");

  const statuses = ["unfinished", "finished", "in process"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, detail, status, fromDateTime, toDateTime });
    setTitle("");
    setDetail("");
    setStatus("");
    setFromDateTime("");
    setToDateTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Task</h1>
      <div className="container">
        <div className="date-time">
          From:
          <input
            type="datetime-local"
            value={fromDateTime}
            onChange={(e) => setFromDateTime(e.target.value)}
            placeholder="From"
          />
          To:
          <input
            type="datetime-local"
            value={toDateTime}
            onChange={(e) => setToDateTime(e.target.value)}
            placeholder="To"
          />
          <div className="statuses">
            {statuses.map((state, index) => (
              <div className="status" key={index}>
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
        Add Task
      </button>
    </form>
  );
}

export default AddUserTask;
