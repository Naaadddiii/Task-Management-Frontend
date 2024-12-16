import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import { Trash, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/TaskService";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [sortOption, setSortOption] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.fetchTasks(token);
      setTasks(data);
      setFilteredTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleEditClick = async (taskId) => {
    try {
      const taskDetails = await TaskService.fetchTaskDetails(taskId, token);
      setSelectedTask(taskDetails);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching task details:", error.message);
    }
  };

  const handleTaskAdded = () => {
    setShowAddModal(false);
    fetchTasks();
  };

  const handleTaskEdited = () => {
    setShowEditModal(false);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await TaskService.deleteTask(taskId, token);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }
    }
  };

  const calculateTotalTime = (start, end) => {
    const diff = (new Date(end) - new Date(start)) / 60000;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  useEffect(() => {
    let updatedTasks = [...tasks];

    if (statusFilter)
      updatedTasks = updatedTasks.filter(
        (task) => task.status === statusFilter
      );
    if (priorityFilter)
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === parseInt(priorityFilter)
      );

    if (sortOption) {
      updatedTasks.sort((a, b) => {
        const aValue = new Date(a[sortOption.split(":")[0]]);
        const bValue = new Date(b[sortOption.split(":")[0]]);
        return sortOption.includes("ASC") ? aValue - bValue : bValue - aValue;
      });
    }

    setFilteredTasks(updatedTasks);
  }, [statusFilter, priorityFilter, sortOption, tasks]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4">
        <Header />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Task List</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowAddModal(true)}
            >
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-4">
            <select
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
              className="border p-2 rounded"
            >
              <option value="">Sort</option>
              <option value="startTime:ASC">Start Time: ASC</option>
              <option value="startTime:DESC">Start Time: DESC</option>
            </select>
            <select
              onChange={(e) => setPriorityFilter(e.target.value)}
              value={priorityFilter}
              className="border p-2 rounded"
            >
              <option value="">Priority</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
              className="border p-2 rounded"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          {loading && <p>Loading tasks...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="text-left">Title</th>
                  <th className="text-center">Priority</th>
                  <th className="text-center">Start</th>
                  <th className="text-center">End</th>
                  <th className="text-center">Total Time</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr key={task._id}>
                    <td className="text-left">{task.title}</td>
                    <td className="text-center">{task.priority}</td>
                    <td className="text-center">
                      {new Date(task.startTime).toLocaleString()}
                    </td>
                    <td className="text-center">
                      {new Date(task.endTime).toLocaleString()}
                    </td>
                    <td className="text-center">
                      {calculateTotalTime(task.startTime, task.endTime)}
                    </td>
                    <td className="text-center">{task.status}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEditClick(task._id)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded transition-all duration-200"
                        aria-label="Edit Task"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded transition-all duration-200"
                        aria-label="Delete Task"
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onTaskAdded={handleTaskAdded}
          />
        )}
        {showEditModal && selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onClose={() => setShowEditModal(false)}
            onTaskUpdated={handleTaskEdited}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
