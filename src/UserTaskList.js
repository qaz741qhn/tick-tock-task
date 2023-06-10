import UserTask from "./UserTask";
import { useNavigate } from "react-router";
import "./UserTaskList.css";

function UserTaskList({ tasks, onDelete, onUpdate }) {
  const navigate = useNavigate();
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <UserTask
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <div className="no-task">
          <h3>No tasks to show...</h3>
          <button onClick={() => navigate("/add_task")}>Add Task</button>
        </div>
      )}
    </div>
  );
}

export default UserTaskList;
