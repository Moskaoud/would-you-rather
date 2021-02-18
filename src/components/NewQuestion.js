import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class NewQuestion extends Component {
    state = {
        textOp1: '',
        textOp2: '',
        toHome: false,
    }
    handleOp1 = (e) => {
        const op1 = e.target.value
        this.setState(() => ({
            textOp1: op1
        }))
    }
    handleOp2 = (e) => {
        const op2 = e.target.value
        this.setState(() => ({
            textOp2: op2
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const optionOneText = this.state.textOp1
        const optionTwoText = this.state.textOp2

        const dispatch = this.props.dispatch
        const author = this.props.author
        const id = this.props.id
        console.log('NEW Q AUTHOR', author)

        dispatch(handleAddQuestion(optionOneText, optionTwoText, author))

        this.setState(() => ({
            textOp1: '',
            textOp2: '',
            toHome: id ? false : true
        }))
    }
    render() {
        const { toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/questions' />
        }
        return (
            <div className='new-qustion'>
                <Card block>
                    <Card.Header as="h5">Create New Question</Card.Header>
                    <Card.Body>
                        <Card.Title>Complete the quetion:</Card.Title>
                        <Card.Text>Would you rather ...</Card.Text>
                        <Form.Group>
                            <Form.Control required name="textOpt1" placeholder="Enter Option One Text Here"
                                onChange={this.handleOp1} />
                            <Container>
                                <Row>
                                    <Col><hr /></Col>OR<Col><hr /></Col>
                                </Row>
                            </Container>
                            <Form.Control required name="textOpt2" required placeholder="Enter Option Two Text Here"
                                onChange={this.handleOp2} />
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        author: authedUser
    }
}
export default connect(mapStateToProps)(NewQuestion) 