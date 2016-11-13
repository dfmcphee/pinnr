import React from 'react';
import { browserHistory } from 'react-router'
import Group from '../group/group.js';
import GroupStore from '../../stores/group-store';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hashtag: ''
    };
  }

  changeHashtag(event) {
    this.setState({hashtag: event.target.value});
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  createGroup() {
    GroupStore.addGroup({
      name: this.state.name,
      hashtag: this.state.hashtag
    }, (group) => {
      browserHistory.push(`/group/${group.id}`);
    });
  }

  render() {
    return (
      <div className="hello">
        <div>
          <label htmlFor="group-name">Group name</label>
          <input type="text" id="group-name" value={this.state.value} onChange={(event) => this.changeName(event)} />
        </div>

        <div>
          <label htmlFor="group-tag">Hashtag</label>
          <input type="text" id="group-hashtag" value={this.state.value} onChange={(event) => this.changeHashtag(event)} />
        </div>

        <button onClick={() => this.createGroup()}>Create group</button>
      </div>
    );
  }
}
