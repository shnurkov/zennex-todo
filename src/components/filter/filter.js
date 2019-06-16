import React, {Component} from 'react';
import {Radio} from 'antd';
import "./style.scss";

export default class Filter extends Component{
  render(){
    const {filterBy} = this.props;
    return (
      <div className="filter">
            <label  htmlFor="filter-importance">Filter by </label>
            <Radio.Group value = {filterBy} buttonStyle="solid" onChange={this.handleImportanceChange}>
              <Radio.Button className="filter__radio--all" value="all">All</Radio.Button>
              <Radio.Button className="filter__radio--usual" value="usual">Usual</Radio.Button>
              <Radio.Button className="filter__radio--important" value="important">Important</Radio.Button>
              <Radio.Button className="filter__radio--very-important" value="very-important">Very Important</Radio.Button>
            </Radio.Group>
      </div>
    );
  }

  handleImportanceChange = (e) => {
    let filterBy = e.target.value;
    this.props.filter(filterBy);
  }
}
