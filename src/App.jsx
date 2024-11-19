// src/App.js

import { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [taskTodo, setTaskTodo] = useState([]);
  const [priority, setPriority] = useState("");
  const [selectedTasks, setSelectedTasks] = useState("allTasks");
  const [counterId, setCounterId] = useState(1);

  const addTask = () => {
    const newTask = {
      id: counterId,
      text: task,
      completed: false,
      priority: priority,
    };
    setTaskTodo( [...taskTodo, newTask]);
    setTask("");
    setPriority("");
    setCounterId(counterId + 1);
    console.log(newTask.id);
  };

  const deleteTask = (id) => {
    setTaskTodo((allTasks) => allTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = taskTodo.filter((task) => {
    if (selectedTasks === "completed") return task.completed;
    if (selectedTasks === "incompleted") return !task.completed;
    if (selectedTasks === "First" || selectedTasks === "Second")
      return task.priority === selectedTasks;
    return true;
  });

   const toggleCompletion = (id) => {
     setTaskTodo((allTasks) =>
       allTasks.map((task) =>
         task.id === id ? { ...task, completed: !task.completed } : task
        
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl text-blue">Task Management</h1>

      <form className="flex flex-col gap-4 mb-6 border-2 border-gray-500 px-4 py-4 mt-8 rounded-md">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          className="p-2 rounded-md border border-gray-300 w-80"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="">Select Priority Level</option>
          <option value="First">first</option>
          <option value="Second">second</option>
        </select>
        <button
          onClick={addTask}
          className="bg-green-500 text-white p-2 rounded-md "
          type="button"
        >
          Add Task
        </button>
      </form>

      <div className="mb-6">
        <button
          onClick={() => setSelectedTasks("allTasks")}
          className="bg-gray-300 p-2 rounded-md mx-2 hover:bg-gray-400 transition"
        >
          allTasks
        </button>
        <button
          onClick={() => setSelectedTasks("completed")}
          className="bg-gray-300 p-2 rounded-md mx-2 hover:bg-gray-400 transition"
        >
          Completed Tasks
        </button>
        <button
          onClick={() => setSelectedTasks("incompleted")}
          className="bg-gray-300 p-2 rounded-md mx-2 hover:bg-gray-400 transition"
        >
          Incompleted Tasks
        </button>
        <button
          onClick={() => setSelectedTasks("First")}
          className="bg-gray-300 p-2 rounded-md mx-2 hover:bg-gray-400 transition"
        >
          First Priority Tasks
        </button>
        <button
          onClick={() => setSelectedTasks("Second")}
          className="bg-gray-300 p-2 rounded-md mx-2 hover:bg-gray-400 transition"
        >
          Second Priority Tasks
        </button>
      </div>

      <ul className="w-full max-w-lg">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-3 mb-2 rounded-md ${
              task.completed ? "bg-green-100" : "bg-white"
            } `}
            onClick={() => toggleCompletion(task.id)}
          >
            <span>
              {task.text} ({task.priority})
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:text"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
