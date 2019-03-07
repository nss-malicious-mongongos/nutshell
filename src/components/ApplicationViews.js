import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import ArticleManager from "../modules/ArticleManager";
import MovieManager from "../modules/MovieManager"
import MovieForm from "./Movies/MovieForm"
import MovieList from "./Movies/MovieList"
import MovieEditForm from "./Movies/MovieEditForm";
import TaskManager from "../modules/TaskManager";
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/TaskEditForm"


class ApplicationViews extends Component {
  state = {
    articles: [],
    movies: [],
    tasks: []
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
    return ArticleManager.removeAndlist(id)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
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

  componentDidMount() {
    const newState = {}

    MovieManager.getAll()
      .then(movies => newState.movies = movies)
    ArticleManager.getAll()
      .then(articles => newState.articles = articles)
      .then(() => this.setState(newState))
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

    console.log(this.props.activeUser)
    return <React.Fragment>



      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          addNewArticle={this.addNewArticle}
          editArticle={this.EditArticle}
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask} 

        />
      }}
      />

      <Route exact path="/Movies" render={props => {
        return <MovieList {...props}
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
        />
      }}
      />
      <Route path="/Movies/:movieId(\d+)/edit" render={props => {
        return <MovieEditForm {...props}
          movies={this.state.movies}
          updateMovie = {this.updateMovie}
        />
      }}
      />

      <Route exact path="/Movies/New" render={props => {
        return <MovieForm {...props}
          addMovie={this.addMovie}

        />
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
    </React.Fragment>
  }
}

export default ApplicationViews;