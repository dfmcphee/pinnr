import React from 'react';
import { Link } from 'react-router';
import { Container, Menu, Segment } from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Segment basic inverted>
          <Menu inverted pointing secondary>
            <Link to="/groups" className="item" activeClassName='active'>My groups</Link>
            <Menu.Menu position='right'>
              <Link to="/add" className="item" activeClassName='active'>Add group</Link>
            </Menu.Menu>
          </Menu>
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
