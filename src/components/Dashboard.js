import React, {Component} from "react"
import ArticleList from "./news/NewsList";

export default class Dashboard extends Component {
    render() {
        return (
            <ArticleList {...this.props} />
        )
    }
}