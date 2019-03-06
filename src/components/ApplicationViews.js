import React, { Component } from "react"
import { Route } from "react-router-dom"

import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/TaskEditForm"

import Dashboard from "./Dashboard";
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
			<Route path="/" render={(props) => {
				return <Dashboard {...props} tasks={this.state.tasks} />
			}} />

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
