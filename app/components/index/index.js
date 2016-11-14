import React from 'react';
import { browserHistory } from 'react-router';
import AuthenticationStore from '../../stores/authentication-store';
import { Label, Form, Input, Button, Container, Header } from 'semantic-ui-react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
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
    this.setState({authenticated: AuthenticationStore.isAuthenticated()});
  }

  componentDidMount() {
    AuthenticationStore.addChangeListener(() => this.updateAuthentication())
  }

  componentWillUnmount() {
    AuthenticationStore.removeChangeListener(() => this.updateAuthentication())
  }

  login() {
    AuthenticationStore.login({
      username: this.state.username,
      password: this.state.password
    }, (result) => {
      this.setState({
        authenticated: result
      })
    });
  }

  navigate() {
    browserHistory.push('/add');
  }

  loginForm() {
    if (this.state.authenticated) {
      return;
    }

    return (
      <div>
        <Header as="h1">Login</Header>
        <Form size="large">
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Username</label>
              <Input required value={this.state.title}
                onChange={(event) => this.changeUsername(event)} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input type="password" required value={this.state.password}
                  onChange={(event) => this.changePassword(event)} />
            </Form.Field>
          </Form.Group>
          <Button primary size="large" type="button" floated="right" onClick={() => this.login()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }

  createGroup() {
    if (!this.state.authenticated) {
      return;
    }
    return (
      <div>
        <Header as="h1">Welcome</Header>
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
