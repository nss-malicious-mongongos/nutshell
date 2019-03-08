import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './article.css'


export default class ArticleList extends Component {

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))

        const friendarray = this.props.friends.flatMap(friend =>
            this.props.articles.filter(
                o => o.userId === friend.otherPersonId)) || []

        console.log(friendarray)
        const friendArticleArray = friendarray || []


        return (
            <React.Fragment>
            <div className="overflow-auto" id="articles-module">
                <h1 className="ArticleHeader ">My Articles </h1>
                <button type="button"
                    className="btn btn-dark"
                    onClick={() => {
                        this.props.history.push("/articles/new")
                    }
                    }>
                    Add News Article
           </button>
                {
                    this.props.articles.filter(article => article.userId === userId)
                        .map(article =>
                            <section className="articleContainer ">
                                <div key={article.id} className="article-card card shadow bg-light" >
                                    <h2>{article.title}</h2>
                                    <p>{article.synopsis}</p>
                                    <a href={article.url}>{article.url}</a>

                                </div>

                                <button className="btn btn-danger" onClick={() => { this.props.deleteArticle(article.id) }}>Delete Article </button>

                                <button
                                    type="button"
                                    className="editArticleButton btn btn-info btn-fill"
                                    onClick={() => {
                                        this.props.history.push(`/articles/${article.id}/edit`);
                                    }}
                                >
                                    Edit Article
                            </button>
                            </section>
                        )

                }
                </div>
                <div className="overflow-auto" id="articles-friend-module">
                <h1>My Friends News Articles</h1>






                {
                    friendArticleArray.map(article =>

                        <section className="articleContainer ">
                            <div className="friendArticles article-card card shadow bg-light">
                                <h3>{article.title}</h3>
                                <p>{article.synopsis}</p>
                                <a href={article.url}>{article.url}</a>
                                <h4>User Name: {article.user.username}</h4>




                            </div>
                        </section>
                    )

                }





            </div >
            </React.Fragment>
        )

    }
}