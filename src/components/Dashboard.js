import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class Dashboard extends Component {

    render() {
        let { authedUser, users, questions } = this.props
        let ansQ = Object.keys(users[authedUser].answers)
        // answerd questions sorted descending
        let ansArg = Object.keys(questions).filter((id) => ansQ.indexOf(id) > -1).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        //unanswerd questions sorted descending
        let unansQ = Object.keys(questions).filter((id) => ansQ.indexOf(id) === -1).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

        return (
            <div>
                <Tabs defaultActiveKey="unans" id="unanswered-questions">
                    <Tab eventKey="unans" title="Unanswered Questions" >
                        <ul className='dashboard-list'>
                            {/* Unanswered Questions ids */
                                unansQ.map((id) => (
                                    <li key={id}>
                                        {/*ans to decide unanswered questions */}
                                        <Question id={id} ans={false} />
                                    </li>
                                ))}
                        </ul>
                    </Tab>
                    <Tab eventKey="ans" title="Answerd Questions">
                        <ul className='dashboard-list'>
                            {/* Answered Questions ids */
                                ansArg.map((id) => (
                                    <li key={id}>
                                        <Question id={id} ans={true} />
                                    </li>
                                ))}
                        </ul>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        questions,
        users,
        authedUser
    }
}
export default connect(mapStateToProps)(Dashboard) 