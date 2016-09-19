import React, { Component } from 'react';

export default class LikeButton extends Component {
  constructor() {
    super();
    this.editor = {
      content: "Testinhalt"
    }
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({liked: !this.state.liked});
  }
  render() {
    return (
      <textarea>
      {this.editor.content}
      </textarea>
    );
  }
}
