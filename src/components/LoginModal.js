import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, setToken } from '../services/request'
import { setUser } from '../store'
import "./style.css"
import loginImg from "../../src/logo.png";


const initialState = {
    username: '',
    password: '',
    loading: false,
    error: false
}

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.timeout = null
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    render() {
        const { loading, error } = this.state
        const { user } = this.props
        let modalCard = null
        if (!user) {
            modalCard = (
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Login</p>
                        <button className="delete" onClick={() => this.close()} aria-label="close" />
                    </header>
                    <section className="modal-card-body">
                        <form>
                        <img  className="logo" src={loginImg} alt="Tsl" />
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        value={this.state.username}
                                        onChange={({ target: { value } }) => this.setState({ username: value })}
                                        onKeyPress={e => (e.key === 'Enter' ? this.submit() : null)}
                                        name="username"
                                        className="input"
                                        type="text"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-user" />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        value={this.state.password}
                                        onChange={({ target: { value } }) => this.setState({ password: value })}
                                        onKeyPress={e => (e.key === 'Enter' ? this.submit() : null)}
                                        name="password"
                                        className="input"
                                        type="password"
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-lock" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => this.submit()} className="button is-link">
                            <span>Submit</span>
                            {loading ? (
                                <span className="icon">
                                    <i className="fa fa-circle-o-notch fa-spin" />
                                </span>
                            ) : null}
                        </button>
                        <button className="button" onClick={() => this.close()}>
                            Cancel
                        </button>
                        {error ? <p className="help is-danger">Invalid login information.</p> : null}
                    </footer>
                </div>
            )
        } else {
            modalCard = (
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Welcome back!</p>
                        <button className="delete" onClick={() => this.close()} aria-label="close" />
                    </header>
                    <section className="modal-card-body">
                        <div className="content">Glad to see you again, {this.state.username}!</div>
                    </section>
                    <footer className="modal-card-foot" />
                </div>
            )
        }

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => this.close()} />
                {modalCard}
            </div>
        )
    }

    submit() {
        this.setState({ loading: true })
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        request
            .post('auth/', user)
            .then(data => {
                if (data && data.token) {
                    setToken(data.token)
                    this.props.login({
                        ...user,
                        token: data.token
                    })
                    // Reset component state
                    this.setState({
                        error: false,
                        loading: false
                    })
                    // Auto close
                    this.timeout = setTimeout(() => {
                        this.props.close()
                    }, 3000)
                }
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    close() {
        if (!this.state.loading) {
            this.props.close()
        }
    }
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = dispatch => ({ login: user => dispatch(setUser(user)) })
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal)
