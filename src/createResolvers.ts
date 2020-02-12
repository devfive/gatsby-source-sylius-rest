import { CreateResolversArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

export function createResolvers(
  { reporter }: CreateResolversArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] createResolvers');
  }
}
