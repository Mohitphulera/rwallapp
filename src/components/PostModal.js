import React, { Component } from 'react'
import { request } from '../services/request'

const initialState = {
    loading: false,
    error: false,
    content: ''
}

export default class PostModal extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render() {
        const { loading, error, content } = this.state
        const { close, hidden } = this.props

        const footerMessage = !error ? (
            <p className="help">You can use CTRL + Enter or CMD + Enter to submit, too!</p>
        ) : (
            <p className="help is-danger">{error}</p>
        )
        const loadingIcon = loading ? (
            <span className="icon">
                <i className="fa fa-circle-o-notch fa-spin" />
            </span>
        ) : null

        return (
            <div hidden={hidden}>
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => close()} />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Make a Post</p>
                            <button className="delete" onClick={() => close()} aria-label="close" />
                        </header>
                        <section className="modal-card-body">
                            <form>
                                <div className="field">
                                    <div className="control has-icons-left has-icons-right">
                                        <textarea
                                            value={content}
                                            onChange={({ target: { value } }) => this.setState({ content: value })}
                                            onKeyUp={({ ctrlKey, key }) => (ctrlKey && key === 'Enter' ? this.submit() : null)}
                                            name="message"
                                            className="textarea"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={() => this.submit()} className="button is-link">
                                <span>Submit</span>
                                {loadingIcon}
                            </button>
                            <button className="button" onClick={() => close()}>
                                Cancel
                            </button>
                            {footerMessage}
                        </footer>
                    </div>
                </div>
            </div>
        )
    }

    submit() {
        this.setState({
            loading: true,
            error: ''
        })
        request
            .post('posts/', { message: this.state.content })
            .then(() => {
                this.props.postCreated()
                this.close(false)
            })
            .catch(response => {
                let error = 'Failed to submit post.'
                if (response && response.message) {
                    error = response.message.join(' ')
                }
                this.setState({
                    loading: false,
                    error
                })
            })
    }

    reset() {
        this.setState(initialState)
    }

    close(preserve = true) {
        if (!preserve) {
            this.reset()
        }
        this.props.close()
    }
}
