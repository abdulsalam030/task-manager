import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Task } from "../types/task.d";
import {
  getTasks,
  addTaskApi,
  editTaskApi,
  deleteTaskApi,
} from "../api/taskApi";

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  // Add a task
  const addTask = async (task: Task) => {
    const newTask = await addTaskApi(task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Edit a task
  const editTask = async (id: string, updatedTask: Task) => {
    const updated = await editTaskApi(id, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updated : task))
    );
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    await deleteTaskApi(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
