module.exports = {
  // CAMERA
  CAMERA_ID: '0',
  CAMERA_IP: 'http://localhost:8080',
  CAMERA_PICTURE_PATH: '/home/pi/motion/lastsnap.jpg',

  // HUE
  HUE_HOST: process.env.HUE_HOST,
  HUE_LED_ID: process.env.HUE_LED_ID,
  HUE_USERNAME: process.env.HUE_USERNAME,

  // ETHEREUM
  PROVIDER_URL: 'http://localhost:8565',
  BASIL_ADDRESS: '0x74e69eb21fe53169db6fe6f765fea7fea23d03ec',

  // TWITTER
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
