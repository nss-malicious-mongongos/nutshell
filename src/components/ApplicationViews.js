import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import ArticleManager from "../modules/ArticleManager";
import MovieManager from "../modules/MovieManager"


class ApplicationViews extends Component {
  state = {
    articles: [],
    movies: []
  }

  movies = MovieManager.getAll()

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


  componentDidMount() {
    const newState = {}

    MovieManager.getAll()
      .then(movies => newState.movies = movies)
    ArticleManager.getAll()
      .then(articles => newState.articles = articles)
      .then(() => this.setState(newState))
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

        />
      }}
      />


    </React.Fragment>
  }
}

export default ApplicationViews
