import React, {Component} from "react"
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList";

export default class Dashboard extends Component {

    render() {
        return <React.Fragment>
            <ArticleList {...this.props} />
            <MovieList {...this.props} />
        </React.Fragment>
    }
}
