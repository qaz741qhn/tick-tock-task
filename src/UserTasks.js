import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTaskList from "./UserTaskList";

function requireAuth(WrappedComponent, apiURL) {
  return function(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('user');
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    return <WrappedComponent {...props} apiURL={apiURL} />;
  }
}

function UserTasks({ apiURL }) {
  const [tasks, setTasks] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiURL}/user_tasks`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          throw new Error("User not logged in");
        } else {
          return response.json();
        }
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("There was an error!", error));
  }, [apiURL, navigate]);  

  const handleDelete = (id) => {
    fetch(`${apiURL}/user_tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          throw new Error("User not logged in");
        } else {
          return response.json();
        }
      })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error("There was an error!", error));
  };

  const handleUpdate = (id, updatedTask) => {
    fetch(`${apiURL}/user_tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user')}`
      },
      body: JSON.stringify({ user_task: updatedTask }),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          throw new Error("User not logged in");
        } else {
          return response.json();
        }
      })
      .then((data) =>
        setTasks(tasks.map((task) => (task.id === id ? data : task)))
      )
      .catch((error) => console.error("There was an error!", error));
  };
  

  return (
    <div>
      <h1>Tasks</h1>
      {tasks ? (
        <UserTaskList
          tasks={tasks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ) : (
        <h3>Loading tasks...</h3>
      )}
    </div>
  );
}

export default requireAuth(UserTasks, "https://multi-api.herokuapp.com");
