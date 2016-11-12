import React from 'react';

export default class NoMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="no-match">
        <h1 className="no-match__title">Page not found</h1>
      </div>
    );
  }
}
