import React, {Component} from "react"
import ArticleList from "./news/NewsList";
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
            <ArticleList {...this.props} />

            <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />

            </React.Fragment>
        )
    }
}