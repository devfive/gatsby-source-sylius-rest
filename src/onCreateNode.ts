import { CreateNodeArgs } from 'gatsby';
import { SourceSyliusPluginOptions, defaultOptions } from './options/SourceSyliusPluginOptions';

export function onCreateNode<TNode extends object = {}>(
  { reporter }: CreateNodeArgs<TNode>,
  options: SourceSyliusPluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onCreateNode');
  }
}
