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
import { reportDebug } from './utils/reportDebug';
import { getObjectSchema } from './schemas/getObjectSchema';
import { associationTypeSchema } from './schemas/Nodes/AssociationType';

export function createSchemaCustomization(
  { actions: { createTypes }, reporter, schema }: CreateSchemaCustomizationArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):void {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  reportDebug(reporter, options, 'createSchemaCustomization');

  createTypes([
    schema.buildObjectType(getObjectSchema(productPriceSchema, options.schemas.productPrice)),
    schema.buildObjectType(getObjectSchema(productVariantSchema, options.schemas.productVariant)),
    schema.buildObjectType(getObjectSchema(productTaxonsSchema, options.schemas.productTaxons)),
    // todo
    schema.buildObjectType(getObjectSchema(associationTypeSchema, {})),
    schema.buildObjectType(getObjectSchema(imageSchema, options.schemas.image)),
    schema.buildObjectType(getObjectSchema(taxonSchema, options.schemas.taxon)),
    schema.buildObjectType(getObjectSchema(productSchema, options.schemas.product)),
  ]);
}
