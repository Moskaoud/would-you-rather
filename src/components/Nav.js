import { React, Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Image from 'react-bootstrap/Image'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  render() {
    let { users, authedUser } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/questions' exact activeClassName='active'>
              Home
          </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
          </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
          </NavLink>
          </li>
          {authedUser !== null &&
            <li>
              Hello, {users[authedUser].name}
              <Image src={users[authedUser].avatarURL}
                style={{ width: '20px', marginLeft: '20px', marginRight: '20px' }} />
              <NavLink to='/' activeClassName='active' onClick={() => this.props.dispatch(setAuthedUser(null))}>Logout</NavLink>
            </li>
          }</ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Nav) 
