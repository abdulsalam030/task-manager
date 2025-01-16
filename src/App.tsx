import React from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Index from "./components/Index";
import TaskPage from "./pages/TaskPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/tasks" element={<Index />} />
      <Route path="/add-task" element={<TaskPage />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    // <TaskProvider>
    //   <div className="min-h-screen bg-gray-100 p-8">
    //     <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
    //       <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
    //       <TaskForm />
    //       <TaskList />
    //     </div>
    //   </div>
    // </TaskProvider>

    // <TaskProvider>
    //   <div className="min-h-screen bg-gray-100 p-8">
    //     <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
    //       <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
    //       <TaskList />
    //     </div>
    //   </div>
    // </TaskProvider>
    <RouterProvider router={router} />
  );
};

export default App;
