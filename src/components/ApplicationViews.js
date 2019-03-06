import React, { Component } from "react";
import { Route } from "react-router-dom";

import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm";
import TaskEditForm from "./task/TaskEditForm";

import UserManager from "../modules/UserManager";

import FriendManager from "../modules/FriendManager";

import Dashboard from "./Dashboard";
class ApplicationViews extends Component {
	state = {
		tasks: [],
		friends: [],
		users: []
	}

	componentDidMount() {
		const newState = {};

		const userId = parseInt(sessionStorage.getItem("credentials"))
		
		TaskManager.getQuery(`?userId=${userId}&completed=false&_expand=user`)
			.then(tasks => newState.tasks = tasks)

			.then(() => UserManager.getAll())
			.then(users => newState.users = users)

			.then(() => FriendManager.getQuery(`?userId=${userId}&_expand=user`))
			.then(friends => newState.friends = friends)
		
			.then(() => this.setState(newState))
	}
	
	addTask = task => {
		return TaskManager.addTask(task)
			.then(() => TaskManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&completed=false&_expand=user`))
			.then(tasks => 
				this.setState({
					tasks: tasks
				})
			)
	}
	updateTask = editedTask => {
		return TaskManager.edit(editedTask)
			.then(() => TaskManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&completed=false&_expand=user`))
			.then(tasks => 
				this.setState({
					tasks: tasks
				})
			)
	}
	deleteTask = id => {
		TaskManager.delete(id)
			.then(() => TaskManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&completed=false&_expand=user`))
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
				return <Dashboard {...props} tasks={this.state.tasks} updateTask={this.updateTask} deleteTask={this.deleteTask} friends={this.state.friends} users={this.state.users} />
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