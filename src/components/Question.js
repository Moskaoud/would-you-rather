import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class Question extends Component {
  render() {
    const { question, users, ans } = this.props
    let qID = {pathname: `/questions/${question.id}`,
    param1:ans
  }
    return (

      <div>
        <Card>
          <Card.Header as="h5">{users[question.author].name} asks:</Card.Header>
          <Card.Body>
            <Card.Title>Would you rather</Card.Title>
            <Card.Img variant="top" src={users[question.author].avatarURL}  style={{ width: '50px' }} />
            <Card.Text>...{question.optionOne.text}...</Card.Text>
            {/* <Link to={`/questions/${question.id}`}> */}
            <Link to={qID}>
                <Button variant="outline-info" onClick={this.handleViewPoll}>View Poll</Button>
            </Link>
              
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id, ans }) {
  let question = questions[id]
  return {
    authedUser,
    question,
    users,
    ans
  }
}

export default withRouter(connect(mapStateToProps)(Question))