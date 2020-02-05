import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import GlobalStyles from './styles'
import LoginPage from './components/login/LoginPage'
import LogoutPage from './components/logout/LogoutPage'
import SignupPage from './components/signup/SignupPage'
import TopBar from './components/layout/TopBar'
import EventsList from './components/events/EventsList'
import EventDetails from './components/events/EventDetails'
import TicketDetails from './components/tickets/TicketDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <GlobalStyles />
          <TopBar />
          <main>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/events/:ed/tickets/:id" component={TicketDetails} />
            <Route exact path="/" render={() => <Redirect to="/events" />} />
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
