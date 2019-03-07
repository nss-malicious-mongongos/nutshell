import React, { Component } from "react";

export default class ChatEditForm extends Component {
    // Set initial state
    state = {
        text: "",
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    /*
          Local method for validation, creating message object, and
          invoking the function reference passed from parent component
       */
    createMessageObject = evt => {
        evt.preventDefault()
        const message = {
            text: this.state.text,
            userId: parseInt(sessionStorage.credentials),
            timestamp: new Date().toLocaleString()
        }

        // Create the message and redirect user to message list
        this.props
            .createMessage(message)
            .then(() => this.props.history.push("/"));

    };

    render() {
        console.log(sessionStorage.credentials)
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