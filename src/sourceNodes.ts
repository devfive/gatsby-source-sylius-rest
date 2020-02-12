import { SourceNodesArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

export function sourceNodes(
  { reporter }: SourceNodesArgs,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] sourceNodes');
  }
}
