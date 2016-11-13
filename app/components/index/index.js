import React from 'react';
import { browserHistory } from 'react-router'
import Group from '../group/group.js';
import GroupStore from '../../stores/group-store';
import { Label, Form, Input, Button } from 'semantic-ui-react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hashtag: '',
      nameError: false,
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

  changeName(event) {
    this.setState({name: event.target.value});
  }

  blurName(event) {
    this.setState({
      nameError: (this.state.name === '')
    });
  }

  createGroup() {
    if (this.state.nameError || this.state.hashtagError) {
      return;
    }

    GroupStore.addGroup({
      name: this.state.name,
      hashtag: this.state.hashtag
    }, (group) => {
      browserHistory.push(`/group/${group.id}`);
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field error={this.state.nameError}>
            <label>Group Name</label>
            <Input value={this.state.name}
              onBlur={(event) => this.blurName(event)}
              onChange={(event) => this.changeName(event)} />
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
          <Button type="button" onClick={() => this.createGroup()}>Create</Button>
        </Form>
      </div>
    );
  }
}
