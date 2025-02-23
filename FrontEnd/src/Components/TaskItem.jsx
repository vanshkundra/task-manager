import { useState } from "react";

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  const [editText, setEditText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    toggleTask(task._id); 
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  const handleSave = () => {
    if (!editText.trim()) return alert("Task cannot be empty.");
    setIsEditing(false);
    toggleTask(task._id, { text: editText, completed: task.completed }); 
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-md mb-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 p-1 border rounded"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            onClick={handleToggle} 
          >
            {task.text}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleToggle}
              className={`px-3 py-1 rounded-lg transition ${
                task.completed
                  ? "bg-gray-400 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              ✅
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              ❌
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
