import React, { Component } from "react"
import { Route } from "react-router-dom"

import TaskManager from "../modules/TaskManager";

import TaskList from "./task/TaskList";
class ApplicationViews extends Component {
	state = {
		tasks: []
	}

	componentDidMount() {
		const newState = {};

		TaskManager.getAll()
			.then(tasks => newState.tasks = tasks)

			.then(() => this.setState(newState))
	}

	render() {
		console.log(this.state)
		return <React.Fragment>
			<TaskList tasks={this.state.tasks} />

			<Route path="/tasks/new" render={(props) => {
				return <TaskForm {...props} />
			}} />
			<Route path="/tasks/:taskId(\d+)/edit" render={(props) => {
				return <TaskEditForm {...props} />
			}} />
		</React.Fragment>
	}
}

export default ApplicationViews
