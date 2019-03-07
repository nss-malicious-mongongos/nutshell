import React, {Component} from "react"
import EventList from "./event/EventList"

export default class Dashboard extends Component {
    render() {
        return (
            <EventList history={this.props.history}
            showPastEvents={this.props.showPastEvents}
            showPastEventsToggle={this.props.showPastEventsToggle}
            events={this.props.events}
            deleteEvent={this.props.deleteEvent} />
        )
    }
}