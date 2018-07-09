import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindAll} from 'lodash'
import PropTypes from 'prop-types'
import findUserRequest from '../Requests/findUser'
import Profile from '../Profile/Profile'
import './style.css'

export class App extends Component {
    constructor(props) {
        super(props)

        bindAll(this, [
            'changeInputHandler' ,
            'checkUserHandler',
            'renderProfile',
            'onFetchingSuccess',
            'onFetchingFailure'
        ])

        this.state = {
            enteredName: ''
        }
    }


    changeInputHandler(e) {
        this.setState({
            enteredName: e.target.value
        })
    }

    checkUserHandler() {
        if (this.state.enteredName !== '') {
            this.props.dispatch({type: 'FETCHING_USER'})
            findUserRequest(this.state.enteredName)
                .then(res => this.onFetchingSuccess(res))
                .catch(err => this.onFetchingFailure(err))
        }
    }

    onFetchingSuccess(response) {
        const user = response.data
        this.props.dispatch({type: 'USER_FETCHED_SUCCESSFUL', data: {user}})
    }

    onFetchingFailure(error) {
        this.props.dispatch({type: 'USER_FETCHED_FAILURE', data: {error}})
    }

    renderProfile() {
        return (
            <div>
                {this.props.isProcessing && <h3>Loading...</h3>}
                {this.props.gitUser && !this.props.isProcessing ? <Profile gitUser={this.props.gitUser} /> : null}
            </div>
        )
    }


    render() {
        return (
          <div className="container">
            <div className="top">
              <h1>GitHub users search</h1>
            </div>
            <div className="bottom">
              <div className="inputContainer">
                <input type="text" className="usernameInput" onChange={this.changeInputHandler}/>
                <button className="searchButton" onClick={this.checkUserHandler}>Find</button>
              </div>
                {this.renderProfile()}
            </div>
          </div>
        )
    }
}


App.propTypes = {
    isProcessing: PropTypes.bool,
    dispatch: PropTypes.func,
    gitUser: PropTypes.shape({
        avatar_url: PropTypes.string,
        user: PropTypes.string,
        location: PropTypes.string,
        email: PropTypes.string,
        blog: PropTypes.string,
    })
}

export default connect(
        store => ({
            gitUser: store.profile.gitUser,
            isProcessing: store.profile.isProcessing
        }), dispatch => ({ dispatch })
)(App)
