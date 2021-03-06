import React from 'react';
import { browserHistory, Link } from 'react-router';
import AuthenticationStore from '../../stores/authentication-store';
import { Label, Form, Input, Button, Container, Header } from 'semantic-ui-react';
import Login from '../login/login';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null,
      username: '',
      password: ''
    };

    AuthenticationStore.init();
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  updateAuthentication() {
    this.setState({
      authenticated: AuthenticationStore.isAuthenticated(),
      user: AuthenticationStore.getUser()
    });
  }

  componentDidMount() {
    AuthenticationStore.addChangeListener(() => this.updateAuthentication())
  }

  componentWillUnmount() {
    AuthenticationStore.removeChangeListener(() => this.updateAuthentication())
  }

  navigate() {
    browserHistory.push('/add');
  }

  loginForm() {
    if (this.state.authenticated) {
      return;
    }

    return (
      <Login />
    );
  }

  createGroup() {
    if (!this.state.authenticated) {
      return;
    }
    return (
      <div>
        <Header as="h1">Welcome {this.state.user.username}</Header>
        <Button primary size="large" type="button" onClick={() => this.navigate()}>
          Create a new group
        </Button>
      </div>
    );
  }

  render() {
    return (
      <Container text>
        {this.loginForm()}
        {this.createGroup()}
      </Container>
    );
  }
}
