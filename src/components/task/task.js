import React, {Component} from 'react';
import "./style.scss";

export default class Task extends Component{
  render(){
    const {task} = this.props;
    return (
      <div className="task">
        <div className="task__title-wrap">
          <div className="task__checkbox"></div>
          <div className="task__title">{task.title}</div>
        </div>
        <div className="task__delete"></div>
      </div>
    );
  }
}