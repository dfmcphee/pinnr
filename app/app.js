import React from 'react';
import { Link } from 'react-router';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';
import AuthenticationStore from './stores/authentication-store';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    }

    AuthenticationStore.init();
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

  logout() {
    AuthenticationStore.logout();
  }

  authenticatedMenu() {
    if (!this.state.authenticated) {
      return;
    }

    return (
      <Menu inverted pointing secondary>
        <Link to="/groups" className="item" activeClassName='active'>My groups</Link>
        <Link to="/add" className="item" activeClassName='active'>Add group</Link>

        <Menu.Menu position='right'>
         <Button primary className="item" onClick={() => this.logout()}>Logout</Button>
        </Menu.Menu>
      </Menu>
    );
  }

  unauthenticatedMenu() {
    if (this.state.authenticated) {
      return;
    }

    return (
      <Menu inverted pointing secondary>

        <Menu.Menu position='right'>
          <Link to="/login" className="item" activeClassName='active'>Login</Link>
          <Link to="/signup" className="item" activeClassName='active'>Signup</Link>
        </Menu.Menu>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <Segment basic inverted>
          {this.authenticatedMenu()}
          {this.unauthenticatedMenu()}
        </Segment>
        <Container>
          <section>
            {this.props.children}
          </section>
        </Container>
      </div>
    );
  }
}
