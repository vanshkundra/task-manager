import TaskItem from "./TaskItem";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-white text-center italic">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}
