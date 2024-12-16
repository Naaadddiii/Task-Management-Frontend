import React, { useState } from "react";
import TaskService from "../services/TaskService";

const AddTaskModal = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = async () => {
    const newTask = {
      title,
      startTime,
      endTime,
      priority: parseInt(priority),
      status,
    };

    try {
      const result = await TaskService.addTask(
        newTask,
        localStorage.getItem("token")
      );
      onTaskAdded(result);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <label className="block mb-2">Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <label className="block mb-2">End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <label className="block mb-2">Priority:</label>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <label className="block mb-2">Status:</label>
        <input
          type="radio"
          id="pending"
          name="status"
          value="pending"
          checked={status === "pending"}
          onChange={(e) => setStatus(e.target.value)}
          className="mr-2"
        />
        <label htmlFor="pending" className="mr-4">
          Pending
        </label>

        <input
          type="radio"
          id="finished"
          name="status"
          value="finished"
          checked={status === "finished"}
          onChange={(e) => setStatus(e.target.value)}
          className="mr-2"
        />
        <label htmlFor="finished">Finished</label>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
