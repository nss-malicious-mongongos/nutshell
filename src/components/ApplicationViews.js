import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import EventManager from "../modules/EventManager";
import EventForm from "./event/EventForm";
class ApplicationViews extends Component {
  state = {
    events: [],
    showPastEvents: false
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
    .then(events => this.setState({events: events}))
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
    this.refreshEvents()
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}
        showPastEvents={this.state.showPastEvents}
        showPastEventsToggle={this.showPastEventsToggle}
        events={this.state.events}
        deleteEvent={this.deleteEvent}
        />
      }}
      />
      <Route path="/newEvent" render={props => {
        return <EventForm {...props} addEvent={this.addEvent} />
      }}/>
    </React.Fragment>
  }
}

export default ApplicationViews
