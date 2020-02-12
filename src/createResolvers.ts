import { CreateResolversArgs } from 'gatsby';
import {
  defaultOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';

export function createResolvers(
  { reporter }: CreateResolversArgs,
  options: SyliusSourcePluginOptions = defaultOptions,
):void {
  if (options.debug) {
    reporter.info('[Sylius Source] createResolvers');
  }
}
