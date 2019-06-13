import React, {Component} from 'react';
import "./style.scss";

export default class Task extends Component{
  render(){
    const {task, isDone} = this.props;
    return (
      <div className = {isDone ? "task task--done" : "task"}>
        <div className="task__title-wrap">
          <div className="task__checkbox" onClick = {this.handleDoneBtn}></div>
          <div className="task__title">{task.title}</div>
        </div>
        <div className="task__delete" onClick = {this.handleDeleteBtn}></div>
      </div>
    );
  }

  handleDeleteBtn = () => {
    this.props.del(this.props.task.id);
  }
  handleDoneBtn = () => {
    this.props.setDone(this.props.task.id);
  }
}