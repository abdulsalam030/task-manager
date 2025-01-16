import React from "react";
import TaskForm from "../components/TaskForm";
import { TaskProvider } from "../context/TaskContext";

const TaskPage: React.FC = () => {
  return (
    <>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <TaskForm />
          </div>
        </div>
      </TaskProvider>
    </>
  );
};

export default TaskPage;
