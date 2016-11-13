import React from 'react';

export default class Member extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="member">
        <span className="member__name">{this.props.name}</span>
        <span className="member__email">{this.props.email}</span>
        <button type="button">Delete</button>
      </div>
    );
  }
}
