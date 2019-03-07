
import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./chatList.css"


export default class ChatList extends Component {
    render() {
        console.log(this.props.messages)
        return (
            <section className="list">
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
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.history.push(`/animals/${this.props.animal.id}/edit`);
                                    }}
                                >Edit
                                </button>
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