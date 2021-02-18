import React, { Component } from 'react'
import logo from '../logo.svg';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        currentUser: 'select'
    }
    handleChange = (e) => {
        const id = e.target.value
        this.setState(() => ({
            currentUser: id
        }))
        const { dispatch } = this.props
        dispatch(setAuthedUser(id))
    }
    render() {        
        let {authedUser} = this.props
        if (authedUser !== null) {
            return <Redirect to='/questions' />
        }
        const users = this.props.users
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />

                <div>
                    <select defaultValue={this.state.currentUser} onChange={this.handleChange}>
                        <option key={1} value={this.state.currentUser} disabled>Select User</option>
                        {
                            Object.keys(users).map(u => <option value={users[u].id} key={users[u].id}>{users[u].name}</option>)
                        }
                    </select>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        users,authedUser
    }
}
export default connect(mapStateToProps)(Login)