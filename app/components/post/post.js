import React from 'react';
import { Card, Button } from 'semantic-ui-react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card key={this.props.post.id}>
        <Card.Content>
          <Card.Header>{this.props.post.username}</Card.Header>
          <Card.Meta>{this.props.post.service}</Card.Meta>
          <Card.Description>
            {this.props.post.content}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='red' onClick={this.props.onRemove}>Delete</Button>
        </Card.Content>
      </Card>
    );
  }
}
