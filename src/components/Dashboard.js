import React, { Component } from "react"
import ChatList from "./chat/ChatList"

export default class Dashboard extends Component {
    render() {
        return (
            //put your components here
            <ChatList messages={this.props.messages}
                deleteMessage={this.props.deleteMessage}
                {...this.props}
            />
        )
    }
}