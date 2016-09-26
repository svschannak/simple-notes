import React, { Component } from 'react';

export default class TagComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event){
    this.props.editTags(event.target.value);
  }

  render() {
    return (
      <input className="tag-input" type="text" placeholder="Tags..." value={this.props.tags} onChange={this.handleChange.bind(this)} />
    );
  }
}
