import {
  CreateSchemaCustomizationArgs,
  GatsbyGraphQLType,
} from 'gatsby';
import { GraphQLOutputType } from 'graphql';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

type GatsbyTypes = string
  | GraphQLOutputType
  | GatsbyGraphQLType
  | string[]
  | GraphQLOutputType[]
  | GatsbyGraphQLType[];

// @todo: transform to GraphQL objects
const defaultTypes: GatsbyTypes = [
  `
  type Taxon implements Node @dontInfer {
    code: String!
    name: String!
    slug: String!
    description: String
    children: [Taxon]!
  }
  `,
];

export function createSchemaCustomization(
  { actions: { createTypes }, reporter }: CreateSchemaCustomizationArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] createSchemaCustomization');
  }

  createTypes(defaultTypes);
}
