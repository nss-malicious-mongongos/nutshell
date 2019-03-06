import React, {Component} from "react"
import EventList from "./event/EventList"

export default class Dashboard extends Component {
    render() {
        return (
            <EventList history={this.props.history}
            events={this.props.events}
            deleteEvent={this.props.deleteEvent} />
        )
    }
}