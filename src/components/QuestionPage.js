import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import { handleSaveQuestionAnswer } from '../actions/users'

class QuestionPage extends Component {
    state = {
        radioValue: '',
        toHome: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let answer = this.state.radioValue
        let { dispatch, authedUser } = this.props
        let qid = this.props.match.params.question_id
        // console.log('radioVal => ', radioVal)
        dispatch(handleSaveQuestionAnswer(authedUser, qid, answer))
        this.setState(() => ({
            toHome: true
        }))

    }
    onChangeValue = (event) => {
        this.setState(() => ({
            radioValue: event.target.value
        }))

    }
    render() {
        let { toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/questions' />
        }
        let id = this.props.match.params.question_id
        let ans = this.props.location.param1 // answered qustion or not value from param1
        let { questions, users, authedUser } = this.props

        if (questions[id] == null) {
            return (
                <div>Error 404</div>
            )
        }

        let author = questions[id].author
        let avatarURL = users[questions[id].author].avatarURL
        let opOnetxt = questions[id].optionOne.text
        let opOneVotes = questions[id].optionOne.votes.length
        let opTwotxt = questions[id].optionTwo.text
        let opTwoVotes = questions[id].optionTwo.votes.length
        let totalVotes = opOneVotes + opTwoVotes

        if (ans) {
            return (
                <div>
                    <Card >
                        <Card.Header style={{ textAlign: 'left' }} >Asked by {author}</Card.Header>
                        <Container>
                            <Row >
                                <Col md={2}><Card.Img variant="top" src={avatarURL} style={{ width: '50px' }} /></Col>
                                <Col md={10}><Row>Results:</Row>
                                    <Row >
                                        <Card style={{ width: '90%', margin: '10px' }}>
                                            <Card.Body>Would you rather {opOnetxt}
                                                <ProgressBar now={(opOneVotes / totalVotes) * 100}
                                                    label={`${(opOneVotes / totalVotes) * 100}%`}
                                                    variant="info" /></Card.Body>
                                            <Card.Text>{opOneVotes} out of {totalVotes} votes</Card.Text>
                                        </Card>
                                        <Card style={{ width: '90%', margin: '10px' }}>
                                            <Card.Body>Would you rather {opTwotxt}
                                                <ProgressBar now={(opTwoVotes / totalVotes) * 100}
                                                    label={`${(opTwoVotes / totalVotes) * 100}%`}
                                                    variant="info" />
                                            </Card.Body>
                                            <Card.Text>{opTwoVotes} out of {totalVotes} votes</Card.Text>
                                        </Card>
                                    </Row>
                                </Col>

                            </Row>
                        </Container>
                    </Card>
                </div>
            )
        }
        else {
            return (
            <Card>
                {// check whether the user has already answered this question. 
                Object.keys(users[authedUser].answers).indexOf(id) > -1
                && <Redirect to='/questions' />}
                
                <Card.Header style={{ textAlign: 'left' }}>{users[author].name} asks:</Card.Header>
                <Container>
                    <Row>
                        <Col><Card.Img variant="top" src={avatarURL} style={{ width: '50px' }} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'left' }} >Would You Rather ...</Card.Title>
                                <div onChange={this.onChangeValue}>
                                    <Row style={{ paddingLeft: '10px' }}><input id='op1' type="radio" name='op' value='optionOne' />
                                        <label htmlFor='op1' style={{ paddingLeft: '10px' }}>{opOnetxt}</label>
                                    </Row>
                                    <Row style={{ paddingLeft: '10px' }}><input id='op2' type="radio" name='op' value='optionTwo' />
                                        <label htmlFor='op2' style={{ paddingLeft: '10px' }}>{opTwotxt}</label>
                                    </Row>
                                </div>
                                <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                            </Card.Body>

                        </Col>
                    </Row>
                </Container>
            </Card>
            )
        }
    }
}
function mapStateToProps({ authedUser, users, questions }) {
    return {
        questions,
        users,
        authedUser
    }
}
export default withRouter(connect(mapStateToProps)(QuestionPage))   