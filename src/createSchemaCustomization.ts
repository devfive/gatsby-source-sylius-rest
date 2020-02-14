import { CreateSchemaCustomizationArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { imageSchema } from './schemas/Nodes/Image';
import { productSchema } from './schemas/Nodes/Product';
import { productPriceSchema } from './schemas/Nodes/ProductPrice';
import { productTaxonsSchema } from './schemas/Nodes/ProductTaxons';
import { productVariantSchema } from './schemas/Nodes/ProductVariant';
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
    schema.buildObjectType(productPriceSchema),
    schema.buildObjectType(productVariantSchema),
    schema.buildObjectType(productTaxonsSchema),
    schema.buildObjectType(imageSchema),
    schema.buildObjectType(taxonSchema),
    schema.buildObjectType(productSchema),
  ]);
}
