const db = require('./models/db');

const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const startStream = function(group) {
  console.log(`Stream started for #${group.hashtag}.`);
  client.stream('statuses/filter', {track: `#${group.hashtag}`}, function(stream) {
    stream.on('data', function(event) {
      var tweetPost = {
        username: event.user.screen_name,
        content: event.text,
        service: 'twitter',
        GroupId: group.id
      };

      if (event.entities.media && event.entities.media.length > 0) {
        tweetPost.attachment = event.entities.media[0].media_url;
      }

      db.Post.create(tweetPost);
    });

    stream.on('error', function(error) {
      throw error;
    });
  });
}

module.exports = {
  startStream: startStream,
  init: function() {
    db.Group.findAll({}).then(function(groups) {
      groups.map(function(group) {
        startStream(group);
      });
    });
  }
};
