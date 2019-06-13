import React, {Component} from 'react';
import "./style.scss";
// import tasks from "../../tasks.json";

import Task from "../task/task";

export default class TaskList extends Component{
  state = {
    tasks: [],
    newTaskTitle: "",
    uniqueId: 0 //temp
  }
  render(){
    const taskElements = this.state.tasks.map((task) => {
      return <li key = {task.id}><Task task = {task} del = {this.deleteTask}  /></li>
    });
    return (
      <div className="tasks-list">
        <div className="tasks-list__main">
          <ul>
            {taskElements}
          </ul>
        </div>
        <div className="tasks-list__add-field-wrap">
          <input className="tasks-list__add-field" placeholder="Type a task" type="text" value = {this.state.newTaskTitle} onChange = {this.handleChange} onKeyPress = {this.handleKeyPress}/>
          <button className="tasks-list__add-field__btn" onClick = {this.handleAddTaskBtn}></button>
        </div>
      </div>
    );
  }
  
  
  handleChange = (e) => {
    this.setState({newTaskTitle: e.target.value});
  }
  handleKeyPress = (e) => {
    if(e.key === "Enter"){
      this.handleAddTaskBtn();
    }
  }
  handleAddTaskBtn = () =>{
    if(this.state.newTaskTitle){
      this.setState({newTaskTitle: ""});
      this.addNewTask();
    }
  }
  addNewTask = () => {
    let tasks = this.state.tasks;
    let uniqueId = this.state.uniqueId;
    uniqueId++;
    tasks.push({
      id: uniqueId, 
      title: this.state.newTaskTitle,
      description: null,
      importance: null,
      time: {
        end: null,
        done: null
      },
      isExpired: false,
      isDone: false
    });
    this.setState({tasks, uniqueId});
  }
  deleteTask = (id) => {
    let tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++){
      if(tasks[i].id  === id){
        tasks.splice(i, 1);
        break;
      }
    }
    this.setState({tasks});
  }
}