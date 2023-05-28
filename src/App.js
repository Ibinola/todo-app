import React, { useState } from "react";
import "./App.css";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [activeTab, setActiveTab] = useState("All");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!input) {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      value: input,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput("");
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "Active") return !task.completed;
    if (activeTab === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1 className="title">#todo</h1>

      <ul className="nav-bar">
        <li className="nav-li">
          <a
            className={activeTab === "All" ? "active-bar" : ""}
            onClick={() => {
              setActiveTab("All");
            }}
            href="#All"
          >
            All
          </a>
        </li>

        <li className="nav-li">
          <a
            className={activeTab === "Active" ? "active-bar" : ""}
            onClick={() => {
              setActiveTab("Active");
            }}
            href="#Active"
          >
            Active
          </a>
        </li>

        <li className="nav-li">
          <a
            className={activeTab === "Completed" ? "active-bar" : ""}
            onClick={() => {
              setActiveTab("Completed");
            }}
            href="#Completed"
          >
            Completed
          </a>
        </li>

      </ul>
      <div className="nav-bar-border active-bar"></div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task" key={task.id}>
            <div className="task-checkbox">
              {task.completed ? (
                <BsCheckSquareFill
                  className="check-icon"
                  onClick={() => completeTask(task.id)}
                />
              ) : (
                <BsCheckSquare
                  className="check-icon"
                  onClick={() => completeTask(task.id)}
                />
              )}
            </div>
            <p className={task.completed ? "task-value completed" : "task-value"}>
              {task.value}
            </p>
            {task.completed && (
              <AiOutlineDelete
                className="delete-icon"
                onClick={() => removeTask(task.id)}
              />
            )}
          </div>
        ))}
      </div>

      {activeTab === "Completed" && tasks.some((task) => task.completed) && (
        <button className="clear-btn" onClick={clearCompletedTasks}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default App;
