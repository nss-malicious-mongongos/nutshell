import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './article.css'


export default class ArticleList extends Component {

    render() {
       const userId = parseInt(sessionStorage.getItem("credentials"))
       console.log(userId)
       return (
           this.props.articles.filter(article => article.userId === userId)
                .map(article =>
                    <div key = {article.id} className="event-card">
                    <section className="articleItems">
                    <h2>{article.title}</h2>
                    <p>{article.synopsis}</p>
                    <a href={article.url}>{article.url}</a>
                    </section>

                    </div>
                    )

            )

    }
}