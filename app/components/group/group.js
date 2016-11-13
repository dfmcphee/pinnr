import React from 'react';
import Post from '../post/post.js';
import GroupStore from '../../stores/group-store';

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

  posts() {
    if (!this.state.posts) {
      return;
    }

    return (
      <ul className="group__posts">
        {this.state.posts.map(post => (
          <li key={post.id}>
            <Post content={post.content} user={post.user} />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="group">
        <h1 className="group__name">{this.state.name}</h1>
        <p>Hashag: #{this.state.hashtag}</p>
        {this.posts()}
      </div>
    );
  }
}
