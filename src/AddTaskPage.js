import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddUserTask from "./AddUserTask";

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

function AddTaskPage({ apiURL }) {
  const navigate = useNavigate();

  const handleAdd = (task) => {
    fetch(`${apiURL}/user_tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      body: JSON.stringify({ user_task: task }),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
          throw new Error("User not logged in");
        } else if (
          response.headers.get("content-type").includes("application/json")
        ) {
          return response.json();
        } else {
          throw new Error("Invalid server response");
        }
      })
      .then((data) => {
        if (data.id) {
          navigate("/user_tasks"); // 如果成功添加任務，則導航回任務列表
        } else {
          console.error("Received task does not have an id", data);
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  return (
    <div>
      <AddUserTask onAdd={handleAdd} />
    </div>
  );
}

export default requireAuth(AddTaskPage, "https://multi-api.herokuapp.com");