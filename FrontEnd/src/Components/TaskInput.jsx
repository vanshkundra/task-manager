export default function TaskInput({ input, setInput, addTask }) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Add your task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-lg font-medium transition"
        onClick={addTask}
        aria-label="Add Task"
      >
        Add
      </button>
    </div>
  );
}
