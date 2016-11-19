const assert = require('assert');

const React = require('react');
const Post = require('../../../app/components/post/post.js').default;
const TestUtils = require('react-addons-test-utils');

describe('Post component', function() {
  it('heading should contain username', function() {
    const post = {
      id: 1234,
      username: 'dom',
      service: 'twitter',
      content: 'Test content'
    }
    const renderedComponent = TestUtils.renderIntoDocument(
      <Post post={post}/>
    );

    this.heading = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'header'
    );

    assert(this.heading.textContent === 'dom');
  });
});
