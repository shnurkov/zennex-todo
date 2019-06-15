import React, {Component} from 'react';
import { Input, Radio, DatePicker, TimePicker, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import "./style.scss";
import moment from 'moment';

export default class TaskDesc extends Component{
  state = {
    date: ""
  }

  render(){
    let {task} = this.props;
    return (
      <div className="task-desc">
        {!task &&
        <div className="task-desc__plug">
          Pick a task
        </div>}
        {task &&
        <div className="task-desc__main">
          <div className="task-desc__row">
            <label htmlFor="title">Name</label>
            <Input id = "title" value = {task.title} onChange={this.handleTitleChange}/>
          </div>
          <div className="task-desc__row">
            <label htmlFor="desc">Description</label>
            <TextArea id="desc" value = {task.description} onChange={this.handleDescChange}/>
          </div>
          <div className="task-desc__row">
            <label htmlFor="importance">Importance</label>
            <Radio.Group value={task.importance} buttonStyle="solid" onChange={this.handleImportanceChange}>
              <Radio.Button value="usual">Usual</Radio.Button>
              <Radio.Button value="important">Important</Radio.Button>
              <Radio.Button value="very-important">Very Important</Radio.Button>
            </Radio.Group>
          </div>
          <div className="task-desc__row">
            <label htmlFor="date-end">Date end</label>
            <DatePicker disabledDate={this.disabledStartDate} id="date-end" format="DD.MM.YYYY" onChange={this.handleDateChange} value = {task.time.end ? moment(task.time.end.toDateString()): null}/>
            <TimePicker format="HH:mm" onChange = {this.handleTimeChange}  value = {task.time.end ? moment(task.time.end.toTimeString(), "HH:mm:ss"): null}/>
          </div>
          {this.props.task.isDone && 
          <div className="task-desc__row">
            <label htmlFor="date-done">Date done</label>
            <DatePicker disabled id="date-done" format="DD.MM.YYYY" value = {task.time.done ? moment(task.time.done.toDateString()): null}/>
            <TimePicker disabled format="HH:mm" value = {task.time.done ? moment(task.time.done.toTimeString(), "HH:mm:ss"): null}/>
          </div>}
          <div className="task-desc__delete-btn">
          <Button type="danger" block onClick ={this.handleDeleteTask}>
            Delete
          </Button>
          </div>
        </div>}
      </div>
    );

  }
  componentDidUpdate(prevProps){
    if(this.props.task && prevProps.task && this.props.task.id !== prevProps.task.id){
      if(this.props.task.time.end){
        this.setState({
          date: this.props.task.time.end
        })
      }else{
        this.setState({date: ""});
      }
    }
  }



  disabledStartDate = startValue => {
    return startValue.valueOf() < (new Date()).valueOf() - 86400000;
  };

  handleTitleChange = (e) => {
    let val = e.target.value;
    this.props.edit(this.props.task.id, {title: val});
  }
  handleDescChange = (e) => {
    let val = e.target.value;
    this.props.edit(this.props.task.id, {description: val});
  }
  handleImportanceChange = (e) => {
    let val = e.target.value;
    this.props.edit(this.props.task.id, {importance: val});
  }
  handleDateChange = (date) => {
    let dateStr = date._d;
    if(!this.state.time){
      dateStr.setHours(0, 0, 0);
    }
    
    this.setState({date: dateStr});
    this.props.edit(this.props.task.id, {time: dateStr});
  }
  handleTimeChange = (time, timeString) => {
    let t = timeString.split(":");
    let h = t[0], m = t[1];
    let date = this.state.date ? this.state.date : new Date();
    
    date.setHours(h, m);
    this.setState({date});

    this.props.edit(this.props.task.id, {time: date});
  }
  handleDeleteTask = () => {
    this.props.del(this.props.task.id);
  }
}