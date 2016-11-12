import React from 'react';
import { Link } from 'react-router'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <nav className="app__menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/groups">Groups</Link>
            </li>
          </ul>
        </nav>
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}
