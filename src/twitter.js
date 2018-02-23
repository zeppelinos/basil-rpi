const fs = require('fs');
const TwitterCli = require('twitter');

class Twitter {
  constructor() {
    this.client = new TwitterCli({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  tweet(imagePath, message) {
    console.log('Uploading image ', imagePath);
    const image = fs.readFileSync(imagePath);
    var self = this;
    this.client.post('media/upload', { media: image }, function(error, media, response) {
      if(error) return console.error('Error while uploading image: ', imagePath, error)
      else {
        console.log('Image uploaded: ', imagePath);
        const status = { status: message, media_ids: media.media_id_string }
        console.log('Twitting...');
        self.client.post('statuses/update', status, function(error, tweet, response) {
          if(error) return console.error('Error while uploading image: ', imagePath, error)
          else console.log('Message tweeted: ', tweet);
        });
      }
    });
  }
}

module.exports=Twitter;
