
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Task text is required"] }, 
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields 
);

module.exports = mongoose.model("Task", TaskSchema);