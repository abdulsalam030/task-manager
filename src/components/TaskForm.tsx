import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/task.d";

interface TaskFormProps {
  initialTask?: Task; // Optional task for editing
  onComplete?: () => void; // Callback when editing or adding is complete
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onComplete }) => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;

  const { addTask, editTask } = taskContext;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setCategory(initialTask.category);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category) return;

    if (initialTask) {
      editTask(initialTask.id, {
        ...initialTask,
        title,
        description,
        category,
      });
    } else {
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        category,
        completed: false,
      };
      addTask(newTask);
    }

    // Clear the form after submission
    setTitle("");
    setDescription("");
    setCategory("");

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md"
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {initialTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
