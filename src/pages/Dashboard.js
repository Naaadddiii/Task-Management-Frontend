import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import TaskService from "../services/TaskService";

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token, navigate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.fetchTasks(token);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const finishedTasks = tasks.filter(
    (task) => task.status === "finished"
  ).length;

  const pendingPercentage = totalTasks
    ? ((pendingTasks / totalTasks) * 100).toFixed(2)
    : 0;
  const finishedPercentage = totalTasks
    ? ((finishedTasks / totalTasks) * 100).toFixed(2)
    : 0;

  const data = {
    labels: ["Pending", "Finished"],
    datasets: [
      {
        data: [pendingTasks, finishedTasks],
        backgroundColor: ["#F87171", "#34D399"],
        hoverBackgroundColor: ["#EF4444", "#10B981"],
      },
    ],
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="w-3/4">
        <Header />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

          {loading && <p>Loading tasks...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 shadow rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Total Tasks
                  </h3>
                  <p className="text-3xl font-bold text-blue-500">
                    {totalTasks}
                  </p>
                </div>
                <div className="bg-white p-6 shadow rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Pending Tasks
                  </h3>
                  <p className="text-3xl font-bold text-red-500">
                    {pendingTasks} ({pendingPercentage}%)
                  </p>
                </div>
                <div className="bg-white p-6 shadow rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Finished Tasks
                  </h3>
                  <p className="text-3xl font-bold text-green-500">
                    {finishedTasks} ({finishedPercentage}%)
                  </p>
                </div>
              </div>

              {/* Pie Chart Section */}
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                  Task Status Overview
                </h3>
                <div className="w-1/2 mx-auto">
                  <Pie
                    data={data}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
