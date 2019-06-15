import React from 'react';
import "./index.scss";
import 'antd/dist/antd.css';
import TaskList from "./components/tasks-list/task-list";

export default function App() {

  return (
    <div className="app">
        <TaskList />
    </div>
  );
}