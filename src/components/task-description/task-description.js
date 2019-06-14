import React, {Component} from 'react';
import { Input, Radio, DatePicker, TimePicker, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import "./style.scss";
// import moment from 'moment';

export default class TaskDesc extends Component{
  render(){
    return (
      <div className="task-desc">
        <div className="task-desc__row">
          <label htmlFor="title">Name</label>
          <Input id = "title"/>
        </div>
        <div className="task-desc__row">
          <label htmlFor="desc">Description</label>
          <TextArea id="desc"/>
        </div>
        <div className="task-desc__row">
          <label htmlFor="importance">Importance</label>
          <Radio.Group defaultValue="usual" buttonStyle="solid">
            <Radio.Button value="usual">Usual</Radio.Button>
            <Radio.Button value="important">Important</Radio.Button>
            <Radio.Button value="very-important">Very Important</Radio.Button>
          </Radio.Group>
        </div>
        <div className="task-desc__row">
          <label htmlFor="date-end">Date end</label>
          <DatePicker id="date-end" />
          <TimePicker format="HH:mm" />
        </div>
        {false && 
        <div className="task-desc__row">
          <label htmlFor="date-done">Date done</label>
          <DatePicker id="date-done" />
          <TimePicker format="HH:mm" />
        </div>}
        <div className="task-desc__delete-btn">
        <Button type="danger" block>
          Delete
        </Button>
        </div>
      </div>
    );
  }
}