import UserTask from "./UserTask";

function UserTaskList({ tasks, onDelete, onUpdate }) {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <UserTask
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onUpdate={onUpdate} 
          />
        ))
      ) : (
        <h3>No tasks to show...</h3>
      )}
    </div>
  );
}

export default UserTaskList;
