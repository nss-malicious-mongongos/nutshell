import React, { Component } from "react"
import ChatManager from "../../modules/ChatManager"

export default class ChatEditForm extends Component {
    // Set initial state
    state = {
        text: "",
        timestamp: "",
        userId: "",
        id: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingMessage = evt => {
        evt.preventDefault()
        {
            const editedMessage = {
                id: this.props.match.params.messageId,
                text: this.state.text,
                userId: this.state.userId,
                timestamp: this.state.timestamp
            };

            this.props.updateMessage(editedMessage)
                .then(() => this.props.history.push("/"))
        }
    }

    componentDidMount() {
        ChatManager.get(this.props.match.params.messageId)
            .then(message => {
                this.setState({
                    text: message.text,
                    userId: message.userId,
                    timestamp: message.timestamp,
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <form className="chatForm">
                    <div className="form-group">
                        <label htmlFor="text">Message name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="text"
                            value={this.state.text}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={this.updateExistingMessage}
                        className="btn btn-primary"
                    >
                        Submit
            </button>
                </form>
            </React.Fragment>
        );
    }
}