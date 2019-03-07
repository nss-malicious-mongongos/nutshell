
import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./chatList.css"
import ChatManager from "../../modules/ChatManager"

export default class ChatList extends Component {

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
        console.log(`PROPS: ${this.props}`)

        return (
            <article className="chat">
                <form className="messageForm">
                    <div className="form-group">
                        <label htmlFor="text"></label>
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
                <section className="chat-output">
                    <h3 className="list-title">Messages</h3>


                    {/* <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/messages/new")
                    }
                    }>
                    Add Message
               </button> */}

                    {this.props.messages.map(message =>
                        <div key={message.id} className="card ">
                            <div className="card-body">
                                <h4 className="card-title">
                                    <div className="text"> {message.text} </div>
                                    <div className="userName"> {`${message.user.username}`}</div>
                                    <div className="timestamp"> {`Created: ${message.timestamp}`}</div>

                                    {(message.editTime !== undefined || null) ?
                                        <div className="timestamp">
                                            {`Edited: ${message.editTime}`}</div>
                                        : null
                                    }
                                    {/* Show edit button only if the message is from the logged in user */}
                                    {(parseInt(sessionStorage.credentials) === message.userId) ?
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => {
                                                    this.props.history.push(`/messages/${message.id}/edit`);
                                                }}
                                            >Edit
                                        </button>
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() =>
                                                    this.props.deleteMessage(message.id)
                                                        .then(() => this.props.history.push("/"))
                                                }
                                            >Delete
                                        </button>
                                        </div>
                                        : null}

                                    {/* <Link className="nav-link" to={`/messages/${message.id}`}>
                                </Link> */}
                                </h4>
                            </div>
                        </div>

                    )
                    }
                </section>
            </article >
        );
    }
}