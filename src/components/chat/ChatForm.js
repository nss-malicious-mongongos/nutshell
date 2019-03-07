import React, { Component } from "react";

export default class ChatForm extends Component {
  state = {
    text: "",
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createMessageObject = evt => {
    evt.preventDefault()
    const message = {
      text: this.state.text,
      userId: parseInt(sessionStorage.credentials),
      timestamp: new Date().toLocaleString(),
      editTime: ""
    }

    this.props
      .createMessage(message)
      .then(() => this.props.history.push("/"));

  };

  render() {
    return (
      <React.Fragment>
        <form className="messageForm">
          <div className="form-group">
            <label htmlFor="text">New Message</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="text"
              placeholder="Type message here"
            />
          </div>
          <button
            type="submit"
            onClick={this.createMessageObject}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}