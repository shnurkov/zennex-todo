import React, {Component} from 'react';
import "./index.scss";
import 'antd/dist/antd.css';
import TaskList from "./components/tasks-list/task-list";

export default class App extends Component {
  state = {
    isMobile: false
  }
  render(){
    return (
      <div className="app">
          <TaskList isMobile = {this.state.isMobile}/>
      </div>
    );  
  }
  componentDidMount = () => {
    this.checkScreenWidth();
    window.onresize = () => {
      this.checkScreenWidth();
    }
  }
  checkScreenWidth = () => {
    let screen = window.innerWidth;
    if(screen <= 576 && !this.state.isMobile){
      this.setState({isMobile: true});
    }else if(screen >= 576 && this.state.isMobile){
      this.setState({isMobile: false})
    }
  }
}