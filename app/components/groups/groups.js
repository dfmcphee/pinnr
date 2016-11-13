import React from 'react';
import { Link } from 'react-router';
import { Card } from 'semantic-ui-react';
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
        <Card.Group>
          {this.state.groups.map(group => (
            <Card key={group.id}>
              <Card.Content>
                <Card.Header><Link to={`/group/${group.id}`}>{group.title}</Link></Card.Header>
                <Card.Meta>#{group.hashtag}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
