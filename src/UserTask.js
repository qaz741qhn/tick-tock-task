import React, { useState } from "react";

function UserTask({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleUpdateClick = () => {
    if (isEditing) {
      onUpdate(task.id, updatedTask);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            name="title"
            value={updatedTask.title}
            onChange={handleInputChange}
          />
          <input
            name="detail"
            value={updatedTask.detail}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.detail}</p>
          <p>{task.status}</p>
        </>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={handleUpdateClick}>
        {isEditing ? "Submit" : "Update"}
      </button>
    </div>
  );
}

export default UserTask;
