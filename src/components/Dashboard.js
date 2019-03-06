import React, {Component} from "react";
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            //put your components here
            <TaskList tasks={this.props.tasks} history={history} />
        )
    }
}