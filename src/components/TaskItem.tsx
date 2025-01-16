import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Task } from "../types/task.d";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [category, setCategory] = useState(task.category);

  if (!taskContext) return null;

  const { editTask, deleteTask } = taskContext;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!title || !category) {
      alert("Please provide a title and category");
      return;
    }

    const updatedTask: Task = {
      ...task,
      title,
      description,
      category,
    };

    editTask(task.id, updatedTask);
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode
    setTitle(task.title); // Reset fields
    setDescription(task.description || "");
    setCategory(task.category);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md my-2">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
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
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-black px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <span className="text-sm text-gray-500 italic">
              {task.category}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
