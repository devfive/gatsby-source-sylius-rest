import { CreateSchemaCustomizationArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { productSchema } from './schemas/Nodes/Product';
import { productTaxonsSchema } from './schemas/Nodes/ProductTaxons';
import { taxonSchema } from './schemas/Nodes/Taxon';

export function createSchemaCustomization(
  { actions: { createTypes }, reporter, schema }: CreateSchemaCustomizationArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):void {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  if (options.debug) {
    reporter.info('[Sylius Source] createSchemaCustomization');
  }

  createTypes([
    schema.buildObjectType(productTaxonsSchema),
    schema.buildObjectType(taxonSchema),
    schema.buildObjectType(productSchema),
  ]);
}
