import React, {Component} from 'react';
import "./style.scss";

export default class Task extends Component{
  render(){
    const {task} = this.props;
    return (
      <div className="task">
        {task.title}
      </div>
    );
  }
}