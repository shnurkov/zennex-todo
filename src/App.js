import React from 'react';
import "./index.scss";
import 'antd/dist/antd.css';
import TaskList from "./components/tasks-list/task-list";
import TaskDesc from "./components/task-description/task-description";

export default function App() {
  return (
    <div className="app">
        <TaskList />
        <TaskDesc />
    </div>
  );
}