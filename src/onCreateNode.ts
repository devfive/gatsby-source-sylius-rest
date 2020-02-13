import { CreateNodeArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function onCreateNode<TNode extends object = {}>(
  { reporter }: CreateNodeArgs<TNode>,
  pluginOptions: PartialSyliusSourcePluginOptions,
):void {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  if (options.debug) {
    reporter.info('[Sylius Source] onCreateNode');
  }
}
