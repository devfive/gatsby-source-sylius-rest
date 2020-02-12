import { ParentSpanPluginArgs } from 'gatsby';
import { defaultOptions, SourceSyliusPluginOptions } from './options/SourceSyliusPluginOptions';

export function onPreBootstrap(
  { reporter }: ParentSpanPluginArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onPreBootstrap');
  }
}
