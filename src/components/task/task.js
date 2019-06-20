import React, {Component} from 'react';
import "./style.scss";

export default class Task extends Component{
  render(){
    const {task, isDone, isActive} = this.props;

    let taskClassName = "task";
    if(isDone) taskClassName += " task--done";
    if(isActive === task.id) taskClassName += " task--active";
    if(task.isOverdue) taskClassName += " task--overdue";
    return (
      <div className = {taskClassName} onClick = {this.handleActiveBtn}>
        <div className="task__title-wrap">
          <div className="task__checkbox" onClick = {this.handleDoneBtn}></div>
          <div className="task__importance">
            <div className="task__importance--usual"></div>
            {(task.importance === "important" || task.importance === "very-important") &&<div className="task__importance--important"></div>}
            {(task.importance === "very-important") &&<div className="task__importance--very-important"></div>}
          </div>
          <div className="task__title">{task.title}</div>
        </div>
        <div className="task__delete" onClick = {this.handleDeleteBtn}></div>
      </div>
    );
  }
  handleDeleteBtn = (e) => {
    e.stopPropagation();
    this.props.del(this.props.task.id);
  }
  handleDoneBtn = (e) => {
    e.stopPropagation();
    this.props.setDone(this.props.task.id);
  }
  handleActiveBtn = (e) => {
    e.stopPropagation();
    this.props.setActive(this.props.task.id);
  }
}