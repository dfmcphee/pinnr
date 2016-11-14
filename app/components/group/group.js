import React from 'react';
import Post from '../post/post.js';
import GroupStore from '../../stores/group-store';
import PostStore from '../../stores/post-store';
import AuthenticationStore from '../../stores/authentication-store';
import { Card } from 'semantic-ui-react';

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    const { groupId } = this.props.params;

    this.state = {
      authenticated: false,
      user: null,
      groupId: groupId,
      group: {
        title: '',
        username: '',
        hashtag: ''
      }
    };

    AuthenticationStore.init();
    GroupStore.init();
    PostStore.init(groupId);
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

  updateAuthentication() {
    this.setState({
      authenticated: AuthenticationStore.isAuthenticated(),
      user: AuthenticationStore.getUser()
    });
  }

  componentDidMount() {
    GroupStore.addChangeListener(() => this.updateGroup())
    PostStore.addChangeListener(() => this.updatePosts())
    AuthenticationStore.addChangeListener(() => this.updateAuthentication())
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(() => this.updateGroup())
    PostStore.removeChangeListener(() => this.updatePosts())
    AuthenticationStore.removeChangeListener(() => this.updateAuthentication())
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

  isOwner() {
    if (!this.state.user) {
      return false;
    }
    return (this.state.group.UserId === this.state.user.id);
  }

  posts() {
    if (!this.state.posts) {
      return;
    }

    return (
      <Card.Group>
        {this.state.posts.map(post => (
          <Post post={post} key={post.id} onRemove={() => this.removePost(post.id)} owner={this.isOwner()} />
        ))}
      </Card.Group>
    );
  }

  groupDetails() {
    if (!this.state.group) {
      return;
    }

    return (
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
    );
  }

  render() {
    return (
      <div className="group">
        {this.groupDetails()}
        {this.posts()}
      </div>
    );
  }
}
