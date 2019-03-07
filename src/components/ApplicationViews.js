import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import ChatManager from "../modules/ChatManager"
import ChatForm from "../components/chat/ChatForm"
import ChatEditForm from "../components/chat/ChatEditForm"
import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/TaskEditForm"


class ApplicationViews extends Component {
  state = {
    tasks: [],
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

  addTask = task => {
    return TaskManager.addTask(task)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }
  updateTask = editedTask => {
    return TaskManager.edit(editedTask)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }
  deleteTask = id => {
    TaskManager.delete(id)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }

  componentDidMount() {
    const newState = {}

    TaskManager.getUserQuery()
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))

    ChatManager.getAll()
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={(props) => {
        return <Dashboard {...props} tasks={this.state.tasks} updateTask={this.updateTask} deleteTask={this.deleteTask} />
      }} />

      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props} addTask={this.addTask} />
      }} />
      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props} updateTask={this.updateTask} />
      }} />
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

export default ApplicationViews;
