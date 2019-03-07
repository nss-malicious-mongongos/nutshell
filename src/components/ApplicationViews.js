import React, { Component } from "react"
import { Route } from "react-router-dom"

import ChatEditForm from "../components/chat/ChatEditForm"
import ChatForm from "../components/chat/ChatForm"
import ChatManager from "../modules/ChatManager"

import Dashboard from "./Dashboard";

import ArticleManager from "../modules/ArticleManager";
import NewArticleForm from "./news/NewArticleForm";
import EditArticleForm from "./news/EditArticleForm";

import MovieManager from "../modules/MovieManager"
import MovieForm from "./Movies/MovieForm"
import MovieFullList from "./Movies/MovieFullList"
import MovieEditForm from "./Movies/MovieEditForm";

import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm";
import TaskEditForm from "./task/TaskEditForm";

import UserManager from "../modules/UserManager";

import FriendManager from "../modules/FriendManager";
import NewFriend from "./friends/NewFriend";
class ApplicationViews extends Component {
  state = {
    messages: [],
    tasks: [],
    articles: [],
    users: [],
	movies: [],
	friends: []
  }

	componentDidMount() {
		const newState = {};
		
		UserManager.getAll()
			.then(users => newState.users = users)
			
			.then(() => ArticleManager.getAll())
			.then(articles => newState.articles = articles)
			
			.then(() => MovieManager.getAll())
			.then(movies => newState.movies = movies)
			
			.then(() => TaskManager.getUserQuery())
			.then(tasks => newState.tasks = tasks)
			
			.then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
			.then(friends => newState.friends = friends)
			
			.then(() => this.setState(newState))
			.then(() => console.log("state is:", this.state))
	}

	createMessage = message => {
		return ChatManager.post(message)
		  .then(() => ChatManager.getAll())
		  .then(messages =>
			this.setState({
			  messages: messages
			})
		  )
	  }
	  deleteMessage = (id) =>
		ChatManager.delete(id)
		  .then(ChatManager.getAll)
		  .then(messages => this.setState({ messages: messages }))
	
	  updateMessage = editedMessage => {
		return ChatManager.put(editedMessage)
		  .then(() => ChatManager.getAll())
		  .then(messages =>
			this.setState({
			  messages: messages
			})
		  )
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
	deleteFriend = id => {
		console.log(id)
		return FriendManager.delete(id)
			.then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
			.then(friends =>
				this.setState({
					friends: friends
				})
			)
	}

  updateMovie = editedMovie => {
    return MovieManager.updateMovie(editedMovie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

  deleteMovie = id => {
    return MovieManager.deleteMovie(id)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

  addMovie = movie => {
    return MovieManager.addMovie(movie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
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

    return <React.Fragment>

      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          addNewArticle={this.addNewArticle}
          editArticle={this.EditArticle}
          messages={this.state.messages}
          deleteMessage={this.deleteMessage}
          movies={this.state.movies}
		  deleteMovie={this.deleteMovie}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
		  deleteTask={this.deleteTask}
		  friends={this.state.friends}
		  deleteFriend={this.deleteFriend}
		  users={this.state.users}

        />
      }}
      />

      <Route exact path="/Movies" render={props => {
        return <MovieFullList {...props}
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
        />
      }}
      />
      <Route path="/Movies/:movieId(\d+)/edit" render={props => {
        return <MovieEditForm {...props}
          movies={this.state.movies}
          updateMovie={this.updateMovie}
        />
      }}
      />
		  <Route exact path="/Movies/New" render={props => {
			return <MovieForm {...props}
			  addMovie={this.addMovie}
			  />}}
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
      <Route
        path="/messages/:messageId(\d+)/edit" render={props => {
          return <ChatEditForm {...props}
            messages={this.state.messages}
            updateMessage={this.updateMessage} />
        }}
      />
      <Route exact path="/messages/new" render={props => {
        return <ChatForm {...props}
          messages={this.state.messages}
          createMessage={this.createMessage} />
      }}
      />
      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props}
          addTask={this.addTask} />
      }} />

      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props}
          updateTask={this.updateTask} />
      }} />

	<Route exact path="/friends/new" render={(props) => {
		return <NewFriend {...props} users={this.state.users} friends={this.state.friends} addFriend={this.addFriend} />
  	}} />
    </React.Fragment >
  }
}
export default ApplicationViews