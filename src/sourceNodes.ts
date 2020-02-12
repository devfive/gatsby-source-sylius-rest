import { SourceNodesArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function sourceNodes(
  { reporter }: SourceNodesArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] sourceNodes');
  }
}
