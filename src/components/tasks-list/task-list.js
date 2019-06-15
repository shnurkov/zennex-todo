import React, {Component} from 'react';
import TaskDesc from "../task-description/task-description";

import "./style.scss";

// import tasks from "../../tasks.json";

import Task from "../task/task";

export default class TaskList extends Component{
  state = {
    tasks: [],
    activeTaskId: null,
    newTaskTitle: "",
    uniqueId: 0 //temp
  }
  render(){
    const taskElements = this.state.tasks.map((task) => {
      return <li key = {task.id}><Task task = {task} del = {this.deleteTask} setDone = {this.setTaskDone} isDone = {task.isDone} setActive = {this.setActiveTask} isActive = {this.state.activeTaskId}/></li>
    });
    return (
      <div className="tasks-list__wrap">
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
        <TaskDesc task = {this.getActiveTask()} edit = {this.editTask}  del = {this.deleteTask}/>
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
      importance: "usual",
      time: {
        end: null,
        done: null
      },
      isExpired: false,
      isDone: false
    });
    this.setState({tasks, uniqueId, activeTaskId: uniqueId});
  }
  deleteTask = (id) => {
    let tasks = this.state.tasks;
    let delIndex = this.getTaskById(id).index;

    tasks.splice(delIndex, 1);
    this.setState({tasks, activeTaskId: null});
  }
  setTaskDone = (id) => {
    let tasks = this.state.tasks;
    let doneIndex = this.getTaskById(id).index;

    tasks[doneIndex].isDone = !tasks[doneIndex].isDone;
    tasks[doneIndex].time.done = new Date();
    this.setState({tasks});
  }
  setActiveTask = (id) => {
    this.setState({activeTaskId: id});
  }
  getActiveTask = () => {
    return this.state.activeTaskId && this.getTaskById(this.state.activeTaskId).task;
  }

  editTask = (id, options) => {
    let item = this.getTaskById(id);
    let task = item.task, index = item.index;

    options.title && (task.title = options.title);
    options.description && (task.description = options.description);
    options.importance && (task.importance = options.importance);
    options.time && (task.time.end = options.time);

    let newTasksState = this.state.tasks.slice();
    newTasksState.splice(index, 1, task);

    this.setState({tasks: newTasksState});
  }

  getTaskById = (id) => {
    let tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++){
      if(tasks[i].id  === id){
        return {
          task: tasks[i],
          index: i
        }
      }
    }

  }
}