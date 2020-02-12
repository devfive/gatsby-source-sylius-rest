const { onPreBootstrap } = require('./src/onPreBootstrap');
const { onPostBootstrap } = require('./src/gatsby-node');

exports = {
  onPreBootstrap,
  onPostBootstrap,
};
