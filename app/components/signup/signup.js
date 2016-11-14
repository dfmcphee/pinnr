import React from 'react';
import { browserHistory } from 'react-router';
import AuthenticationStore from '../../stores/authentication-store';
import { Label, Form, Input, Button, Container, Header } from 'semantic-ui-react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      username: '',
      password: ''
    };
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  signup() {
    AuthenticationStore.signup({
      username: this.state.username,
      password: this.state.password
    }, function(response) {
      if (response) {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <Container text>
        <Header as="h1">Signup</Header>
        <Form size="large">
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Username</label>
              <Input required value={this.state.title}
                onChange={(event) => this.changeUsername(event)} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input required type="password" value={this.state.password}
                onChange={(event) => this.changePassword(event)} />
            </Form.Field>
          </Form.Group>
          <Button primary size="large" type="button" floated="right" onClick={() => this.signup()}>
            Signup
          </Button>
        </Form>
      </Container>
    );
  }
}
