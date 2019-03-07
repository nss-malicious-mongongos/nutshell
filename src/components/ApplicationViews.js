import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import ArticleManager from "../modules/ArticleManager";
import NewArticleForm from "./news/NewArticleForm";
import EditArticleForm from "./news/EditArticleForm";
import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm";
import TaskEditForm from "./task/TaskEditForm";

import UserManager from "../modules/UserManager";

import FriendManager from "../modules/FriendManager";
import NewFriend from "./friends/NewFriend";


class ApplicationViews extends Component {
	state = {
		tasks: [],
		friends: [],
		users: [],
		articles: []
	}

	componentDidMount() {
		const newState = {};
		
		UserManager.getAll()
			.then(users => newState.users = users)
			
			.then(() => ArticleManager.getAll())
			.then(articles => newState.articles = articles)

			.then(() => TaskManager.getUserQuery())
			.then(tasks => newState.tasks = tasks)

			.then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
			.then(friends => newState.friends = friends)
		
			.then(() => this.setState(newState))

	
		  .then(() => this.setState(newState))
	}

	EditArticle = (editedArticleObject) => {
		return ArticleManager.EditArticle(editedArticleObject)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
      )
	};

	addNewArticle = Article => {
    return ArticleManager.CreateNewArticle(Article)
      .then(() => ArticleManager.getAll())
      .then(articles =>
        this.setState({
			articles: articles
        })
      )
	}
	
	deleteArticle = id => {
		return ArticleManager.deleteArticle(id)
		.then(() => ArticleManager.getAll())
		.then(articles => this.setState({ articles: articles })
		)
		
	}

	addFriend = friend => {
    	return FriendManager.addFriend(friend)
			.then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
      		.then(friends =>
        		this.setState({
					friends: friends
        		})
			)
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
		return TaskManager.delete(id)
			.then(() => TaskManager.getUserQuery())
			.then(tasks =>
				this.setState({
					tasks: tasks
				})
			)
	}

  	render() {
	  
	console.log("State is:", this.state)
    console.log(this.props.activeUser)
    return <React.Fragment>


      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          addNewArticle={this.addNewArticle}
          editArticle={this.EditArticle}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
		  deleteTask={this.deleteTask}
		  friends={this.state.friends}
		  users={this.state.users}

        />
      }}
      />

      <Route exact path="/articles/new" render={props => {
        return <NewArticleForm {...props}
          articles={this.state.articles}
          addNewArticle={this.addNewArticle}


        />
      }}
      />

      <Route path="/articles/:articleId(\d+)/edit" render={props => {
        return <EditArticleForm {...props}
          editArticle={this.EditArticle}
          articles={this.state.articles}

        />
      }}
      />

      	<Route exact path="/tasks/new" render={(props) => {
        	return <TaskForm {...props} addTask={this.addTask} />
      	}} />
    	<Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        	return <TaskEditForm {...props} updateTask={this.updateTask} />
      	}} />

		<Route exact path="/friends/new" render={(props) => {
			return <NewFriend {...props} users={this.state.users} friends={this.state.friends} addFriend={this.addFriend} />
	  	}} />
    </React.Fragment>
  	}
}

export default ApplicationViews;