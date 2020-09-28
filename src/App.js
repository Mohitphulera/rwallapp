import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from './store'
import './App.css'
import Feed from './feeds/Feed'
import LoginModal from './components/LoginModal'
import PostModal from './components/PostModal'
import { request, removeToken } from './services/request'
import RegisterModal from './components/RegisterModal'
import loginImg from "../src/logo.png";

const initialState = {
    show: {
        login: false,
        register: false,
        post: false
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidMount() {
        window.addEventListener('keydown', ({ key }) => {
            if (key === 'Escape') {
                this.setState(initialState)
            }
        })
    }

    render() {
        const { show } = this.state
        const { user } = this.props
        const navBrand = (
            <div className="navbar-brand">
                <div className="navbar-brand-title">
                    <span className="icon has-text-info">
                        {/* <i className="fa fa-comments" /> */}
                        <img src={loginImg } alt="Tsl" />
                    </span>
                    Wall App
                </div>
            </div>
        )
        const showLogin = (login = true) => this.setState({ show: { login } })
        const showRegister = (register = true) => this.setState({ show: { register } })
        const showPost = (post = true) => this.setState({ show: { post } })
        let navItems = null
        if (!user) {
            navItems = (
                <div className="navbar-item">
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary" name="sign-up" onClick={showRegister}>
                                Sign Up
                            </button>
                        </div>
                        <div className="control">
                            <button className="button" name="login" onClick={showLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            navItems = (
                <div className="navbar-item">
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary" name="make-a-post" onClick={showPost}>
                                Make a Post
                            </button>
                        </div>
                        <div className="control">
                            <button className="button" name="logout" onClick={() => this.requestLogout()}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div id="app" className="app">
                <div className="container">
                    <div className="navbar">
                        {navBrand}
                        {navItems}
                    </div>
                </div>
                <Feed ref={instance => (this.feed = instance)} />
                {show.login && <LoginModal close={() => showLogin(false)} />}
                <PostModal close={() => showPost(false)} hidden={!show.post} postCreated={() => this.feed.retrievePosts()} />
                {show.register && <RegisterModal close={() => showRegister(false)} />}
            </div>
        )
    }

    requestLogout() {
        this.props.logout()
        request
            .delete('auth/')
            .then(response => (response.ok ? response : new Error()))
            .then(() => {
                removeToken()
                this.props.logout()
            })
            .catch(() => {
                console.error('Logout request failed.')
                removeToken()
                this.props.logout()
            })
    }
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = dispatch => ({ logout: () => dispatch(setUser()) })
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
