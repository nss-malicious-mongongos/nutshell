
import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./chatList.css"
import ChatManager from "../../modules/ChatManager"

export default class ChatList extends Component {
    render() {
        console.log`messages: ${this.props.messages}`
        return (
            <section className="list">
                <h3 className="list-title">Messages</h3>
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/messages/new")
                    }
                    }>
                    Add Message
               </button>

                {this.props.messages.map(message =>
                    <div key={message.id} className="card ">
                        <div className="card-body">
                            <h4 className="card-title">
                                <div className="text"> {message.text} </div>
                                <div className="userName"> {`${message.user.username}`}</div>
                                <div className="timestamp"> {`${message.timestamp}`}</div>
                                {/* Show edit button only if the message is from the logged in user */}
                                {(parseInt(sessionStorage.credentials) === message.userId) ?
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            this.props.history.push(`/messages/${message.id}/edit`);
                                        }}
                                    >Edit
                                </button>
                                    : null}

                                <button
                                    onClick={() =>
                                        this.props.deleteMessage(message.id)
                                            .then(() => this.props.history.push("/"))
                                    }
                                    className="btn btn-success">Delete
                                </button>
                                {/* <Link className="nav-link" to={`/messages/${message.id}`}>
                                </Link> */}
                            </h4>
                        </div>
                    </div>

                )
                }
            </section>
        );
    }
}