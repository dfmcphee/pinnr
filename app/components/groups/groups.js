import React from 'react';
import { Link } from 'react-router';
import GroupStore from '../../stores/group-store';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: GroupStore.getGroups(),
      loading: true
    };
  }

  componentWillMount() {
    GroupStore.init()
  }

  componentDidMount() {
    GroupStore.addChangeListener(() => this.updateGroups())
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(() => this.updateGroups())
  }

  updateGroups() {
    this.setState({
      groups: GroupStore.getGroups(),
      loading: false
    })
  }

  render() {
    return (
      <div className="groups">
        <ul>
          {this.state.groups.map(group => (
            <li key={group.id}><Link to={`/group/${group.id}`}>{group.title}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}
