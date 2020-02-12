import { ParentSpanPluginArgs } from 'gatsby';
import { defaultOptions, SourceSyliusPluginOptions } from './options/SourceSyliusPluginOptions';

export function onPreInit(
  { reporter }: ParentSpanPluginArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onPreBootstrap');
  }

  if (!options.url) {
    reporter.panic('[Sylius Source] `url` option not provided!');
  }
}
