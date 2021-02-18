import React, { Component } from 'react'
import { connect } from 'react-redux'
import Leaders from './Leaders';
class LeaderBoard extends Component {
    render() {
        let { users } = this.props
        let i = 0
        let uScore = Object.keys(users).map((u) => {
            return { ...users[u], score: Object.keys(users[u].answers).length + users[u].questions.length }
        }).sort((a, b) => b.score - a.score)

        return (
            <div>
                <ul>
                    {
                        uScore.map(u => <li key={i++}><Leaders u={u} /></li>)
                    }
                </ul>
            </div>
        )
    }
}
function mapStateToProps({ users }) {

    return {
        users
    }
}
export default connect(mapStateToProps)(LeaderBoard)