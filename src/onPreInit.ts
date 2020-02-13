import { ParentSpanPluginArgs } from 'gatsby';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function onPreInit(
  { reporter }: ParentSpanPluginArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
):void {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);

  if (options.debug) {
    reporter.info('[Sylius Source] onPreBootstrap');
  }

  if (!options.url) {
    reporter.panic('[Sylius Source] `url` option not provided!');
  }
}
