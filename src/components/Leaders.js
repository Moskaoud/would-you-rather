import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'

class Leaders extends Component {
    render() {
        let { u } = this.props
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src={u.avatarURL} style={{ width: '50px' }} /></Col>
                                <Col md={6}><Card.Title as="h3">{u.name}</Card.Title>
                                    <Card.Text>Answerd questions {Object.keys(u.answers).length}</Card.Text>
                                    <Card.Text>Created questions {u.questions.length}</Card.Text>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <Card.Header>Score</Card.Header>
                                        <Card.Title>{u.score}</Card.Title>
                                    </Card>
                                </Col >
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}
export default connect(mapStateToProps)(Leaders)