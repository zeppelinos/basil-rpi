const fs = require('fs');
const TwitterCli = require('twitter');
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET } = require('constants');

class Twitter {
  constructor() {
    this.client = new TwitterCli({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token_key: TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  tweet(imagePath, message) {
    const self = this;
    console.log('Uploading image ', imagePath);
    const image = fs.readFileSync(imagePath);

    this.client.post('media/upload', { media: image }, function (error, media, response) {
      if (error) return console.error('Error while uploading image: ', imagePath, error)
      else {
        console.log('Image uploaded: ', imagePath);
        const status = { status: message, media_ids: media.media_id_string }

        console.log('Twitting...');
        self.client.post('statuses/update', status, function (error, tweet, response) {
          if (error) return console.error('Error while uploading image: ', imagePath, error)
          else console.log('Message tweeted: ', tweet);
        });
      }
    });
  }
}

module.exports = Twitter;
