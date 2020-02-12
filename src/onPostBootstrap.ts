import { ParentSpanPluginArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function onPostBootstrap(
  { reporter }: ParentSpanPluginArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] onPostBootstrap');
  }
}
