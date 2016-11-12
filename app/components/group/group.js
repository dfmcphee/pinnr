import React from 'react';
import Member from '../member/member.js';
import GroupStore from '../../stores/group';

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
  }

  getStateFromStore(props) {
    const { groupId } = props ? props.params : this.props.params;

    return GroupStore.getGroup(groupId);
  }

  componentDidMount() {
    GroupStore.addChangeListener(() => this.updateGroup())
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(() => this.updateGroup())
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromStore(nextProps));
  }

  updateGroup() {
    this.setState(this.getStateFromStore());
  }

  members() {
    if (!this.state.members) {
      return;
    }

    return (
      <ul className="group__members">
        {this.state.members.map(member => (
          <li key={member.email}>
            <Member name={member.name} email={member.email} />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="group">
        <h1 className="group__name">{this.state.name}</h1>
        {this.members()}
      </div>
    );
  }
}
