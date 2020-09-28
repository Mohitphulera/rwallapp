import React, { Component } from 'react'
import { request } from '../services/request'
import "./style.css"
import loginImg from "../../src/logo.png";

const initialState = {
    username: '',
    password: '',
    email: '',
    loading: false,
    errors: {
        username: '',
        password: '',
        email: '',
        generic: ''
    },
    registered: false
}

export default class RegisterModal extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    render() {
        const { loading, errors, registered } = this.state
        const classNames = {}
        const errorMessages = {}
        for (let key in errors) {
            if (key !== 'generic') {
                if (errors[key]) {
                    classNames[key] = 'input is-danger'
                    errorMessages[key] = <p className="help is-danger">{errors[key]}</p>
                } else {
                    classNames[key] = 'input'
                    errorMessages[key] = null
                }
            } else {
                if (errors[key]) {
                    errorMessages[key] = <p className="help is-danger">{errors[key]}</p>
                } else {
                    errorMessages[key] = <p className="help">By clicking submit, you consent to receive emails from us.</p>
                }
            }
        }

        const modal = {}
        if (!registered) {
            modal.header = (
                <header className="modal-card-head">
                   
                    <p className="modal-card-title">Register</p>
                    <button className="delete" onClick={() => this.close()} aria-label="close" />
                </header>
            )
            modal.body = (
                <section className="modal-card-body">
                    <form>
                    <img  className="logo" src={loginImg} alt="Tsl" />
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    onChange={({ target: { value } }) => this.setState({ username: value })}
                                    value={this.state.username}
                                    name="username"
                                    className={classNames.username}
                                    type="text"
                                    required
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user" />
                                </span>
                            </div>
                            {errorMessages.username}
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    onChange={({ target: { value } }) => this.setState({ email: value })}
                                    value={this.state.email}
                                    name="email"
                                    className={classNames.email}
                                    type="email"
                                    required
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope" />
                                </span>
                            </div>
                            {errorMessages.email}
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    onChange={({ target: { value } }) => this.setState({ password: value })}
                                    value={this.state.password}
                                    name="password"
                                    className={classNames.password}
                                    type="password"
                                    required
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock" />
                                </span>
                            </div>
                            {errorMessages.password}
                        </div>
                    </form>
                </section>
            )
            modal.footer = (
                <footer className="modal-card-foot">
                    <button
                        onClick={event => {
                            event.preventDefault()
                            this.submit()
                        }}
                        className="button is-link"
                    >
                        <span>Submit</span>
                        {loading && (
                            <span className="icon">
                                <i className="fa fa-circle-o-notch fa-spin" />
                            </span>
                        )}
                    </button>
                    <button className="button" onClick={() => this.close()}>
                        Cancel
                    </button>
                    {errorMessages.generic}
                </footer>
            )
        } else {
            modal.header = (
                <header className="modal-card-head">
                    <p className="modal-card-title">Welcome to the club!</p>
                    <button className="delete" onClick={() => this.close()} aria-label="close" />
                </header>
            )
            modal.body = (
                <section className="modal-card-body">
                    <div className="content">Thanks for registering, {this.state.username}! Check your inbox for a welcome email!</div>
                </section>
            )
            modal.footer = (
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={() => this.close()}>
                        Got it!
                    </button>
                </footer>
            )
        }

        return (
            <div>
                <div className="modal is-active" onKeyPress={event => this.handleKeyPress(event)}>
                    <div className="modal-background" onClick={() => this.close()} />
                    <div className="modal-card">
                        {modal.header}
                        {modal.body}
                        {modal.footer}
                    </div>
                </div>
            </div>
        )
    }

    handleKeyPress(event) {
        switch (event.target.key) {
            case 'Enter':
                this.submit()
                break
            case 'Escape':
                this.close()
                break
            default:
                break
        }
    }

    submit() {
        // Reset errors
        this.setState({ loading: true, errors: initialState.errors })
        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        request
            .post('users/', user)
            .then(() => {
                this.setState({ loading: false, registered: true })
            })
            .catch(response => {
                // Add errors
                let errorMessages = {}
                if (response && typeof response === 'object') {
                    for (let key in response) {
                        if (this.state.errors.hasOwnProperty(key)) {
                            errorMessages[key] = response[key].join(' ')
                        }
                    }
                } else {
                    errorMessages.generic = 'Server failure. Please try again later.'
                }
                this.setState({
                    errors: { ...initialState.errors, ...errorMessages },
                    loading: false
                })
            })
    }

    close() {
        this.reset()
        this.props.close()
    }

    reset() {
        this.setState(initialState)
    }
}
