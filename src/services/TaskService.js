const fetchTasks = async (token) => {
  try {
    const response = await fetch(
      `https://task-management-backend-nc44.onrender.com/api/tasks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch tasks");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    throw err;
  }
};

const fetchTaskDetails = async (taskId, token) => {
  try {
    const response = await fetch(
      `https://task-management-backend-nc44.onrender.com/api/tasks/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) throw new Error("Failed to fetch task details");
    const taskDetails = await response.json();
    return taskDetails;
  } catch (error) {
    console.error("Error fetching task details:", error.message);
    throw error;
  }
};

const deleteTask = async (taskId, token) => {
  try {
    const response = await fetch(
      `https://task-management-backend-nc44.onrender.com/api/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to delete the task");
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};

const addTask = async (newTask, token) => {
  try {
    const response = await fetch(
      `https://task-management-backend-nc44.onrender.com/api/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      }
    );
    if (!response.ok) throw new Error("Failed to add task");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding task:", error.message);
    throw error;
  }
};

const updateTask = async (taskId, updatedTask, token) => {
  try {
    const response = await fetch(
      `https://task-management-backend-nc44.onrender.com/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      }
    );
    if (!response.ok) throw new Error("Failed to update task");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw error;
  }
};

export default {
  addTask,
  fetchTasks,
  fetchTaskDetails,
  deleteTask,
  updateTask,
};
