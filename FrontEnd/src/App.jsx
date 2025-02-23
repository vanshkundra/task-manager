import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskList from "./Components/TaskList";
import TaskInput from "./Components/TaskInput";
import FilterButtons from "./Components/FilterButtons";

const API_URL = "http://localhost:5000/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetching tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Adding the task in the list
  const addTask = async () => {
    if (!input.trim()) return alert("Please Enter a Task");

    try {
      const response = await axios.post(API_URL, { text: input, completed: false });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Filtering the task according to particular section
  const toggleTask = async (id) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );

      await axios.put(`${API_URL}/${id}`, {
        completed: !tasks.find((task) => task._id === id)?.completed,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete the task execution
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // To delete all the tasks in a single go
  const clearCompletedTasks = async () => {
    try {
      await Promise.all(tasks.filter((task) => task.completed).map((task) => axios.delete(`${API_URL}/${task._id}`)));
      fetchTasks();
    } catch (error) {
      console.error("Error clearing completed tasks:", error);
    }
  };

  // Assigned task to respective section
  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex justify-center items-center p-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl p-6 rounded-xl max-w-md w-full border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Diamond Ore Consulting Task Manager</h2>

        <TaskInput input={input} setInput={setInput} addTask={addTask} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <TaskList tasks={getFilteredTasks()} toggleTask={toggleTask} deleteTask={deleteTask} />

        {filter === "completed" && tasks.some((task) => task.completed) && (
          <button
            className="w-full mt-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
            onClick={clearCompletedTasks}
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
