import Dashboard from "./Dashboard"
import EventForm from "./event/EventForm";
import EventManager from "../modules/EventManager";
import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskEditForm from "./task/TaskEditForm"
import TaskForm from "./task/TaskForm"
import TaskManager from "../modules/TaskManager";

class ApplicationViews extends Component {
  state = {
    tasks: [],
    events: [],
    showPastEvents: false
  }

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

  refreshEvents = () => {
    const newState = {}
    EventManager.getAll()
      .then(events => {
        newState.events = events
        this.setState(newState)
      })
  }

  addEvent = (event) => {
    EventManager.addEvent(event)
      .then(() => EventManager.getAll())
      .then(events => this.setState({ events: events }))
  }

  showPastEventsToggle = () => {
    const show = {};
    (this.state.showPastEvents === false) ? (show.showPastEvents = true) : (show.showPastEvents = false)
    this.setState(show)
  }

  deleteEvent = (id) => {
    EventManager.delete(id)
      .then(() => EventManager.getAll())
      .then(() => this.refreshEvents())
  }

  componentDidMount() {
    const newState = {};
    this.refreshEvents()

    TaskManager.getUserQuery()
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          showPastEvents={this.state.showPastEvents}
          showPastEventsToggle={this.showPastEventsToggle}
          events={this.state.events}
          deleteEvent={this.deleteEvent}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
        />
      }}
      />
      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props} addTask={this.addTask} />
      }} />
      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props} updateTask={this.updateTask} />
      }} />
      <Route path="/newEvent" render={props => {
        return <EventForm {...props} addEvent={this.addEvent} />
      }} />
    </React.Fragment>
  }
}
export default ApplicationViews;