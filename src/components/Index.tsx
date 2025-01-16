import React from "react";
import { TaskProvider } from "../context/TaskContext";
import TaskList from "../components/TaskList";

const Index: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
