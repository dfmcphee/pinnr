import React from 'react';
import { Link } from 'react-router';
import { Container, Menu } from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container text>
        <Menu pointing secondary>
          <Link to="/groups" className="item" activeClassName='active'>My groups</Link>
          <Menu.Menu position='right'>
            <Link to="/add" className="item" activeClassName='active'>Add group</Link>
          </Menu.Menu>
        </Menu>
        <section>
          {this.props.children}
        </section>
      </Container>
    );
  }
}
