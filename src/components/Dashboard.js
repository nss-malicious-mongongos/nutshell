import React, {Component} from "react";
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        return (
            //put your components here
            <TaskList tasks={this.state.tasks} />
        )
    }
}