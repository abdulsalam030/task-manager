import axios from "axios";
import { Task } from "../types/task.d";
const API_URL = "api/tasks";

// Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTaskApi = async (task: Task): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const editTaskApi = async (id: string, task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTaskApi = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
