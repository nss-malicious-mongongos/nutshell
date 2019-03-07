import ArticleList from "./news/NewsList";
import EventList from "./event/EventList"
import MovieList from "./Movies/MovieList"
import React, { Component } from "react"
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                <ArticleList {...this.props} />
                <EventList history={this.props.history}
                    events={this.props.events}
                    deleteEvent={this.props.deleteEvent} />
                <MovieList {...this.props} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
            </React.Fragment>
        )
    }
}
