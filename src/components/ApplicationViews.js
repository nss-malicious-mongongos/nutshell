import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import EventManager from "../modules/EventManager";
import EventForm from "./event/EventForm";
class ApplicationViews extends Component {
  state = {
    events: []
  }

  refreshEvents = () => {
    const newState = {}
    EventManager.getAll()
      .then(events => {
        newState.events = events
        this.setState(newState)
      })
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
        events={this.state.events}
        deleteEvent={this.deleteEvent}
        addEvent={this.addEvent} />
      }}
      />
      <Route path="/newEvent" render={props => {
        return <EventForm />
      }}/>
    </React.Fragment>
  }
}

export default ApplicationViews
