import React from 'react';
import Group from '../group/group.js';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hello">
        <label htmlFor="group-name">Group name</label>
        <input type="text" id="group-name" />
        <button>Create group</button>
      </div>
    );
  }
}
