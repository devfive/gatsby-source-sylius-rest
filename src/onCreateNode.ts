import { CreateNodeArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function onCreateNode<TNode extends object = {}>(
  { reporter }: CreateNodeArgs<TNode>,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onCreateNode');
  }
}
