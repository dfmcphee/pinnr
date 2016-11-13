import React from 'react';
import Post from '../post/post.js';
import GroupStore from '../../stores/group-store';
import PostStore from '../../stores/post-store';
import { Card } from 'semantic-ui-react';

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    const { groupId } = this.props.params;

    this.state = {
      groupId: groupId,
      group: {
        title: '',
        username: '',
        hashtag: ''
      }
    };

    GroupStore.init();
    PostStore.init();
  }

  getGroupStateFromStore() {
    return GroupStore.getGroup(this.state.groupId);
  }

  getPostsStateFromStore() {
    return PostStore.getPosts(this.state.groupId);
  }

  componentWillMount() {
    this.updateGroup();
    this.updatePosts();
  }

  componentDidMount() {
    GroupStore.addChangeListener(() => this.updateGroup())
    PostStore.addChangeListener(() => this.updatePosts())
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(() => this.updateGroup())
    PostStore.removeChangeListener(() => this.updatePosts())
  }

  updateGroup() {
    this.setState({
      group: this.getGroupStateFromStore()
    });
  }

  updatePosts() {
    this.setState({
      posts: this.getPostsStateFromStore(this.state.groupId)
    });
  }

  removePost(postId) {
    PostStore.removePost(postId);
  }

  posts() {
    if (!this.state.posts) {
      return;
    }

    return (
      <Card.Group>
        {this.state.posts.map(post => (
          <Post post={post} key={post.id} onRemove={() => this.removePost(post.id)} />
        ))}
      </Card.Group>
    );
  }

  render() {
    return (
      <div className="group">
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {this.state.group.title}
            </Card.Header>
            <Card.Meta>
              #{this.state.group.hashtag}
            </Card.Meta>
            <Card.Description>
              <a href={`mailto:${this.state.group.url}@inbound.simplifeed.me`}>
                {this.state.group.url}@inbound.simplifeed.me
              </a>
            </Card.Description>
          </Card.Content>
        </Card>
        {this.posts()}
      </div>
    );
  }
}
