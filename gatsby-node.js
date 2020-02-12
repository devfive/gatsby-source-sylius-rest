const { createResolvers } = require('./src/createResolvers');
const { createSchemaCustomization } = require('./src/createSchemaCustomization');
const { onCreateNode } = require('./src/onCreateNode');
const { onPreBootstrap } = require('./src/onPreBootstrap');
const { onPostBootstrap } = require('./src/onPostBootstrap');
const { sourceNodes } = require('./src/sourceNodes');

exports = {
  createResolvers,
  createSchemaCustomization,
  onCreateNode,
  onPreBootstrap,
  onPostBootstrap,
  sourceNodes,
};
