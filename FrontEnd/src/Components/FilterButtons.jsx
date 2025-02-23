export default function FilterButtons({ filter, setFilter }) {
  return (
    <div className="flex justify-around mb-4">
      {["all", "active", "completed"].map((status) => (
        <button
          key={status}
          className={`px-5 py-2 rounded-full font-medium transition ${
            filter === status ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => setFilter(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}
