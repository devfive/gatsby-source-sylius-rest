import { CreateSchemaCustomizationArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function createSchemaCustomization(
  { actions: { createTypes }, reporter, schema }: CreateSchemaCustomizationArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):void {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  if (options.debug) {
    reporter.info('[Sylius Source] createSchemaCustomization');
  }

  createTypes([
    schema.buildObjectType({
      name: 'SyliusTaxon',
      fields: {
        code: 'String!',
        name: 'String!',
        slug: 'String!',
        locale: 'String!',
        position: 'Int!',
        description: 'String',
      },
      interfaces: [
        'Node',
      ],
      extensions: {
        childOf: {
          types: ['SyliusTaxon'],
        },
        infer: false,
      },
    }),
    schema.buildObjectType({
      name: 'SyliusProduct',
      fields: {
        // attributes: 'SyliusAttribute[]',
        averageRating: 'Int',
        channelCode: 'String!',
        code: 'String!',
        description: 'String',
        // images: 'SyliusImage[]',
        locale: 'String!',
        metaKeywords: 'String',
        metaDescription: 'String',
        name: 'String!',
        shortDescription: 'String',
        slug: 'String!',
        // taxons: 'SyliusProductTaxon',
        // variants: '{ [key: string]: SyliusProductVariant }',
      },
      interfaces: [
        'Node',
      ],
      extensions: {
        infer: false,
      },
    }),
  ]);
}
