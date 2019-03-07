import React, { Component } from "react"
import { Route } from "react-router-dom"
import ChatManager from "../modules/ChatManager"
import Dashboard from "./Dashboard"
import ChatForm from "../components/chat/ChatForm"
import ChatEditForm from "../components/chat/ChatEditForm"

class ApplicationViews extends Component {
  state = {
    messages: [],
    users: []
  }

  createMessage = message => {
    return ChatManager.post(message)
      .then(() => ChatManager.getAll())
      .then(messages =>
        this.setState({
          messages: messages
        })
      )
  }
  deleteMessage = (id) =>
    ChatManager.delete(id)
      .then(ChatManager.getAll)
      .then(messages => this.setState({ messages: messages }))

  componentDidMount() {
    const newState = {}

    ChatManager.getAll()
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          messages={this.state.messages}
          deleteMessage={this.deleteMessage} />
      }}
      />
      <Route
        path="/messages/:messageId(\d+)/edit" render={props => {
          return <ChatEditForm {...props}
            messages={this.state.messages}
            updateMessage={this.updateMessage} />
        }}
      />
      <Route exact path="/messages/new" render={props => {
        return <ChatForm {...props}
          messages={this.state.messages}
          createMessage={this.createMessage} />
      }}
      />
    </React.Fragment>
  }
}
export default ApplicationViews

