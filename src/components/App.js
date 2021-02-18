import '../App.css';
import Login from './Login'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import LeaderBoard from './LeaderBoard'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Switch } from "react-router";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Nav />
            <div>
              { // redirect to login if not authenticated user
                this.props.authedUser == null ?
                  <Router>
                    <Redirect to="/" />
                    <Switch>
                      <Route exact path="/" component={Login} />
                    </Switch>
                  </Router> :
                  <div>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/questions' component={Dashboard} />
                    <Route path='/questions/:question_id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                  </div>
              }
            </div>
          </header>
        </div>
      </Router>
    );
  }
}


function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App) 