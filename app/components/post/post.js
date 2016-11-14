import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  image() {
    if (this.props.post.attachment === '') {
      return;
    }

    return (
      <Image src={this.props.post.attachment} />
    );
  }

  cardActions() {
    if (!this.props.owner) {
      return;
    }

    return (
      <Card.Content extra>
        <Button basic color='red' onClick={this.props.onRemove}>Delete</Button>
      </Card.Content>
    );
  }

  render() {
    return (
      <Card key={this.props.post.id}>
        <Card.Content>
          <Card.Header>{this.props.post.username}</Card.Header>
          <Card.Meta>{this.props.post.service}</Card.Meta>
          {this.image()}
          <Card.Description>
            {this.props.post.content}
          </Card.Description>
        </Card.Content>
        {this.cardActions()}
      </Card>
    );
  }
}
