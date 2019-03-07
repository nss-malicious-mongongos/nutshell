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
		
		TaskManager.getUserQuery()
			.then(tasks => newState.tasks = tasks)
		
			.then(() => this.setState(newState))
	}
	
	addTask = task => {
		return TaskManager.addTask(task)
			.then(() => TaskManager.getUserQuery())
			.then(tasks => 
				this.setState({
					tasks: tasks
				})
			)
	}
	updateTask = editedTask => {
		return TaskManager.edit(editedTask)
			.then(() => TaskManager.getUserQuery())
			.then(tasks => 
				this.setState({
					tasks: tasks
				})
			)
	}
	deleteTask = id => {
		TaskManager.delete(id)
			.then(() => TaskManager.getUserQuery())
			.then(tasks => 
				this.setState({
					tasks: tasks
				})
			)
    }

	render() {
//		console.log("Props are:", this.props)
		console.log("State is:", this.state)
		return <React.Fragment>
			<Route exact path="/" render={(props) => {
				return <Dashboard {...props} tasks={this.state.tasks} updateTask={this.updateTask} deleteTask={this.deleteTask} />
			}} />

			<Route exact path="/tasks/new" render={(props) => {
				return <TaskForm {...props} addTask={this.addTask} />
			}} />
			<Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
				return <TaskEditForm {...props} updateTask={this.updateTask} />
			}} />
		</React.Fragment>
	}
}

export default ApplicationViews;