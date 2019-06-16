import React, {Component} from 'react';
import TaskDesc from "../task-description/task-description";
import Filter from "../filter/filter";
import "./style.scss";

// import tasks from "../../tasks.json";

import Task from "../task/task";

export default class TaskList extends Component{
  state = {
    tasks: [],
    filterBy: "all",
    activeTaskId: null,
    isDescOpen: true,
    newTaskTitle: "",
    uniqueId: 0
  }
  render(){
    const filteredElements = this.state.tasks.filter(task => task.importance === this.state.filterBy || this.state.filterBy === "all");
    const taskElements = filteredElements.map((task) => {
      return <li key = {task.id}><Task task = {task} del = {this.deleteTask} setDone = {this.setTaskDone} isDone = {task.isDone} setActive = {this.setActiveTask} isActive = {this.state.activeTaskId}/></li>
    });
    return (
      <div className="tasks-list__wrap">
        <Filter filter = {this.filterTasks} filterBy = {this.state.filterBy}/>
      {!this.props.isMobile || (!this.state.isDescOpen && !this.state.activeTaskId) && 
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

      </div>}
        {this.state.isDescOpen &&
        <TaskDesc task = {this.getActiveTask()} edit = {this.editTask}  del = {this.deleteTask}/>
        }
      </div>
    );
  }
  componentDidMount = () => {

    let savedTasks = localStorage.getItem("tasks");
    let uniqueId = 0;
    if(savedTasks){
      savedTasks = JSON.parse(savedTasks);
      savedTasks.forEach((task) => {
        if(task.id > uniqueId) uniqueId = task.id;
        if(task.time.end){
          task.time.end = new Date(task.time.end);
          task.timer = this.setTimerOverdue(task, task.id)();
        }
      });
      this.setState({tasks: savedTasks, uniqueId});
    }
  }
  componentDidUpdate = (prevProps) => {
    if(prevProps.isMobile !== this.props.isMobile){
      this.setState({isDescOpen: !this.props.isMobile, activeTaskId: null});
    }

    if(JSON.stringify(this.state.tasks) !== localStorage.getItem("tasks")){
      this.saveTasks();
    }
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
      isOverdue: false,
      isDone: false,
      timer: null
    });


    this.setState({tasks, uniqueId, activeTaskId: uniqueId, filterBy: "all"});
  }
  deleteTask = (id) => {
    let tasks = this.state.tasks;
    let delIndex = this.getTaskById(id).index;
    clearTimeout(tasks[delIndex].timer);
    tasks.splice(delIndex, 1);
    this.setState({tasks, activeTaskId: null});
  }
  setTaskDone = (id) => {
    let tasks = this.state.tasks;
    let doneIndex = this.getTaskById(id).index;

    tasks[doneIndex].isDone = !tasks[doneIndex].isDone;
    tasks[doneIndex].time.done = new Date();
    this.setState({tasks});
    this.checkOverdue(id);
  }
  setActiveTask = (id) => {
    if(!this.isDescOpen){
      this.setState({activeTaskId: id, isDescOpen: true});
    }else{
      this.setState({activeTaskId: id});
    }
  }
  getActiveTask = () => {
    return this.state.activeTaskId && this.getTaskById(this.state.activeTaskId).task;
  }
  editTask = (id, editElem) => {
    let item = this.getTaskById(id);
    let task = item.task, index = item.index;

    (editElem.title || editElem.title === "") && (task.title = editElem.title);
    (editElem.description || editElem.description === "") && (task.description = editElem.description);
    editElem.importance && (task.importance = editElem.importance);
    (editElem.time ||  editElem.time === null) && (task.time.end = editElem.time);
    if(editElem.time){
      task.timer = this.setTimerOverdue(task, id)();
    }
    let newTasksState = this.state.tasks.slice();
    newTasksState.splice(index, 1, task);

    this.setState({tasks: newTasksState});
  }
  setTimerOverdue = (task, id) => {
    return () => {
      task.isOverdue = false;
      let timeToCheck = task.time.end.getTime() - (new Date()).getTime();
      if(task.timer) clearTimeout(task.timer);
      return setTimeout(() => {
        this.checkOverdue(id);
      }, timeToCheck)
    }
  }
  checkOverdue = (id) => {
    let item = this.getTaskById(id);
    let task = item.task, index = item.index;
    if(!task.time.end) return;
    let tasks = this.state.tasks.slice();

    if(((new Date()).getTime() > task.time.end.getTime()) && !task.isDone) {
      task.isOverdue = true;
    }else if(task.isDone){
      task.isOverdue = false;
    }
    tasks.splice(index, 1, task);
    this.setState({tasks});

  }
  saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }
  filterTasks = (filterBy) => {
    this.setState({filterBy})
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