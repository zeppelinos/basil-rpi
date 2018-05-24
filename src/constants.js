module.exports = {
  // CAMERA
  CAMERA_ID: '0',
  CAMERA_IP: 'http://localhost:8080',
  CAMERA_PICTURE_PATH: '/home/pi/motion/lastsnap.jpg',

  // HUE
  HUE_HOST: process.env.HUE_HOST,
  HUE_LED_ID: process.env.HUE_LED_ID,
  HUE_USERNAME: process.env.HUE_USERNAME,
  
  // ROPSTEN
  // PROVIDER_URL: 'http://localhost:8555',
  // BASIL_ADDRESS: '0xd1ed7c1c27c0aa4169fff8f0a5bcd2675fad8781',

  // MAINNET
  PROVIDER_URL: 'http://localhost:8546',
  BASIL_ADDRESS: '0x96dc0af2a77e4b185e5fe6cbfdb21f281e17c733',

  // TWITTER
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
