import { CreateSchemaCustomizationArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function createSchemaCustomization(
  { actions: { createTypes }, reporter, schema }: CreateSchemaCustomizationArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
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
  ]);
}
