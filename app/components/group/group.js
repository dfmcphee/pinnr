import React from 'react';
import Post from '../post/post.js';
import GroupStore from '../../stores/group-store';
import { Card } from 'semantic-ui-react';

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hashtag: '',
      url: '',
      Posts: []
    }
  }

  getStateFromStore(props) {
    const { groupId } = props ? props.params : this.props.params;

    return GroupStore.getGroup(groupId);
  }

  componentWillMount() {
    GroupStore.init()
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
    if (!this.state.Posts) {
      return;
    }

    return (
      <Card.Group>
        {this.state.Posts.map(post => (
          <Post post={post} />
        ))}
      </Card.Group>
    );
  }

  render() {
    return (
      <div className="group">
        <h1 className="group__name">{this.state.title}</h1>
        <p>#{this.state.hashtag}</p>
        <p>
          <a href={`mailto:${this.state.url}@inbound.simplifeed.me`}>
            {this.state.url}@inbound.simplifeed.me
          </a>
        </p>
        {this.posts()}
      </div>
    );
  }
}
