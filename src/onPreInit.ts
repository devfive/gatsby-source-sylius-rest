import { ParentSpanPluginArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function onPreInit(
  { reporter }: ParentSpanPluginArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onPreBootstrap');
  }

  if (!options.url) {
    reporter.panic('[Sylius Source] `url` option not provided!');
  }
}
