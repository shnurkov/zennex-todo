import React, {Component} from 'react';
import "./style.scss";
import tasks from "../../tasks.json";

import Task from "../task/task";

export default class TaskList extends Component{
  state = {
    tasks
  }
  render(){
    const taskElements = this.state.tasks.map((task) => {
      return <li key = {task.id}><Task task = {task} /></li>
    });
    return (
      <div className="tasks-list">
        <div className="tasks-list__main">
          <ul>
            {taskElements}
          </ul>
        </div>
        <div className="tasks-list__add-field-wrap">
          <input className="tasks-list__add-field" placeholder="Type a task" type="text"/>
          <button className="tasks-list__add-field__btn"></button>
        </div>
      </div>
    );
  }
}