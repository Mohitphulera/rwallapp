import React, { Component } from 'react'
import moment from 'moment'
import './Post.css'

export default class Post extends Component {
    render() {
        const {
            post: {
                author: {
                    username
                },
                message,
                timestamp
            }
        } = this.props
        return (
            <div className="card">
                <div className="card-header">
                    <div className="content">
                        <div className="media-content">
                            <p className="title is-5">{username}</p>
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="content">
                        <div data-testid="message"className="is-size-5">{message}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                        <time className="is-size-6">{moment(timestamp).utc().calendar()}</time>
                    </div>
                </div>
            </div>
        )
    }
}