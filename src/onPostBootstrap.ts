import { ParentSpanPluginArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

export function onPostBootstrap(
  { reporter }: ParentSpanPluginArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onPostBootstrap');
  }
}
