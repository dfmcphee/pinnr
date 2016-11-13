import React from 'react';
import { browserHistory } from 'react-router'
import Group from '../group/group.js';
import GroupStore from '../../stores/group-store';
import { Label, Form, Input, Button, Container, Header } from 'semantic-ui-react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      hashtag: '',
      titleError: false,
      hashtagError: false
    };
  }

  changeHashtag(event) {
    this.setState({hashtag: event.target.value});
  }

  blurHashtag(event) {
    this.setState({
      hashtagError: (this.state.hashtag === '')
    });
  }

  changeTitle(event) {
    this.setState({title: event.target.value});
  }

  blurTitle(event) {
    this.setState({
      titleError: (this.state.title === '')
    });
  }

  createGroup() {
    if (this.state.titleError || this.state.hashtagError) {
      return;
    }

    GroupStore.addGroup({
      title: this.state.title,
      hashtag: this.state.hashtag
    }, (group) => {
      browserHistory.push(`/group/${group.id}`);
    });
  }

  render() {
    return (
      <Container text>
        <Header as="h1">Create a new group</Header>
        <Form size="large">
          <Form.Group widths='equal'>
            <Form.Field error={this.state.titleError}>
              <label>Group title</label>
              <Input value={this.state.title}
                onBlur={(event) => this.blurTitle(event)}
                onChange={(event) => this.changeTitle(event)} />
            </Form.Field>
            <Form.Field error={this.state.hashtagError}>
              <label>Hashtag</label>
              <Input labelPosition='left'>
                <Label basic>#</Label>
                <input type='text'
                  value={this.state.hashtag}
                  onChange={(event) => this.changeHashtag(event)}
                  onBlur={(event) => this.blurHashtag(event)} />
              </Input>
            </Form.Field>
          </Form.Group>
          <Button primary size="large" type="button" floated="right" onClick={() => this.createGroup()}>
              Create
          </Button>
        </Form>
      </Container>
    );
  }
}
