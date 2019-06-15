import React, {Component} from 'react';
import { Input, Radio, DatePicker, TimePicker, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import "./style.scss";
import moment from 'moment';

export default class TaskDesc extends Component{
  state = {
    date: "",
    isToday: ""
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
              <Radio.Button className="task-desc__radio--usual" value="usual">Usual</Radio.Button>
              <Radio.Button className="task-desc__radio--important" value="important">Important</Radio.Button>
              <Radio.Button className="task-desc__radio--very-important" value="very-important">Very Important</Radio.Button>
            </Radio.Group>
          </div>
          <div className="task-desc__row">
            <label htmlFor="date-end">Date end</label>
            <DatePicker disabledDate={this.disabledStartDate} id="date-end" format="DD.MM.YYYY" onChange={this.handleDateChange} value = {task.time.end ? moment(task.time.end): null}/>
            <TimePicker disabledHours={this.disableHours} disabledMinutes={this.disableMinutes} format="HH:mm" onChange = {this.handleTimeChange}  value = {this.getTimePickerVal()}/>
          </div>
          {task.isDone && 
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
    let now = new Date();
    now.setHours(0, 0, 0);
    return startValue.valueOf() < now;
  };
  disableHours = () => {
    if(!this.state.isToday) return;
    let hours = [];
    for(let i =0; i < moment().hour(); i++){
        hours.push(i);
    }
    return hours;
  }
  disableMinutes = (selectedHour) => {
    let minutes= [];
    if (selectedHour === moment().hour()){
        for(let i =0; i < moment().minute()+1; i++){
            minutes.push(i);
        }
    }
    return minutes;
  }

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

    if((new Date()).toDateString() === dateStr.toDateString()){
      this.setState({isToday: true});
      let timeH = new Date().getHours();

      if(timeH === 22) dateStr.setHours(timeH+1, 0, 0);
      else if(timeH === 23) dateStr.setHours(23, 59, 59);
      else dateStr.setHours(timeH+2, 0, 0);

    }else{
      this.setState({isToday: false});
      dateStr.setHours(18, 0, 0);
    }

    this.setState({date: dateStr});
    this.props.edit(this.props.task.id, {time: dateStr});
  }
  handleTimeChange = (_time, timeString) => {
    let t = timeString.split(":");
    let h = t[0], m = t[1];
    let date = this.state.date ? this.state.date : new Date();
    // console.log("change time");
    let now = new Date();
    // let timeProp = new Date(this.props.task.time.end);
    if(this.state.isToday && date.getHours() === now.getHours()){
      m = now.getMinutes()+1;
    }

    date.setHours(h, m);
    this.setState({date});

    this.props.edit(this.props.task.id, {time: date});
  }
  handleDeleteTask = () => {
    this.props.del(this.props.task.id);
  }

  // getTimePickerVal = () => {
  //   return this.props.task.time.end ? moment(this.props.task.time.end, "HH:mm:ss"): null;
  // }
  getTimePickerVal = () => {
    if(!this.props.task.time.end) return null;
    let now = new Date();
    let timeProp = new Date(this.props.task.time.end);
    if(this.state.isToday && timeProp.getHours() === now.getHours()){
      timeProp.setMinutes(now.getMinutes()+1);
    }
    return moment(timeProp, "HH:mm:ss");
  }

}