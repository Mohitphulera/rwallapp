import React, { Component } from 'react'
import Post from '../components/Post'
import { request } from '../services/request'

export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: null,
            notify: false
        }
    }

    componentDidMount() {
        this.retrievePosts()
    }

    render() {
        const { posts, notify } = this.state
        let items = null
        if (posts && posts.length > 0) {
            items = posts.map(post => <Post key={post.id} post={post} />)
        } else if (notify) {
            items = <div className="notification is-info" style={{opacity: "0.8"}}>There's no posts to display!</div>
        }
        return (
            <section className="section home">
                <div className="container">{items}</div>
            </section>
        )
    }

    retrievePosts() {
        request
            .get('posts/')
            .then(posts => {
                if (posts) {
                    this.setState({
                        posts,
                        notify: false
                    })
                }
            })
            .catch(() => {
                console.error('Request for posts failed.')
                this.setState({
                    notify: true
                })
            })
    }
}
