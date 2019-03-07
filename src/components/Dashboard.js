import React, { Component } from "react"
import EventList from "./event/EventList"
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                <EventList history={this.props.history}
                    showPastEvents={this.props.showPastEvents}
                    showPastEventsToggle={this.props.showPastEventsToggle}
                    events={this.props.events}
                    deleteEvent={this.props.deleteEvent} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
            </React.Fragment>
        )
    }
}