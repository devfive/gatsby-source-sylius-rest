import { CreateSchemaCustomizationArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

// @todo: transform to GraphQL objects
const defaultTypes: string[] = [
  `type Taxons {
    main: String
    others: [String]
  }`,
  `type Price {
    currency: String!
    current: Int!
  }`,
  `type Variant {
    name: String,
    price: Price!,
    code: String!,
    axis: [String]!
  }`,
  `type Product implements Node @dontInfer {
    code: String!
    slug: String!
    name: String!
    description: String
    shortDescription: String
    channelCode: String!
    averageRating: Int!
    localImage: File
    taxons: Taxons
    variants: [Variant]!
  }`,
  `type Category implements Node @dontInfer {
    code: String!
    slug: String!
    name: String!
    description: String
    position: Int
    subcategories: [Category]!
    parentCategory: Category
    products: [Product]!
    level: Int!
    localImage: File
  }`,
];

export function createSchemaCustomization(
  { actions: { createTypes }, reporter }: CreateSchemaCustomizationArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] createSchemaCustomization');
  }

  createTypes(defaultTypes);
}
