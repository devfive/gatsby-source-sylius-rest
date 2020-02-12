import { CreateSchemaCustomizationArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

export function createSchemaCustomization(
  { reporter }: CreateSchemaCustomizationArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] createSchemaCustomization');
  }
}
