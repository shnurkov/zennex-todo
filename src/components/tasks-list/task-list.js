import React, {Component} from 'react';
import "./style.scss";
import Task from "../task/task";

export default class TaskList extends Component{
  render(){
    return (
      <div className="task-list">
        <Task />
      </div>
    );
  }
}