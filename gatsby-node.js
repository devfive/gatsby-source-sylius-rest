const { createPages } = require('./src/createPages');
const { createResolvers } = require('./src/createResolvers');
const { createSchemaCustomization } = require('./src/createSchemaCustomization');
const { onCreateNode } = require('./src/onCreateNode');
const { onPreInit } = require('./src/onPreInit');
const { onPostBootstrap } = require('./src/onPostBootstrap');
const { sourceNodes } = require('./src/sourceNodes');

exports.createPages = createPages;
exports.createResolvers = createResolvers;
exports.createSchemaCustomization = createSchemaCustomization;
exports.onCreateNode = onCreateNode;
exports.onPreInit = onPreInit;
exports.onPostBootstrap = onPostBootstrap;
exports.sourceNodes = sourceNodes;
