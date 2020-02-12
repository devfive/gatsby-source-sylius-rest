import { ParentSpanPluginArgs, PluginCallback } from 'gatsby';
import { SourceSyliusPluginOptions } from './options/SourceSyliusPluginOptions';

export function onSource({ reporter }:{ reporter: { info: (c: string) => void } }):void {
  reporter.info('gatsby-source-sylius onSource');
}

export function onPostBootstrap(
  { reporter }: ParentSpanPluginArgs,
  options?: SourceSyliusPluginOptions,
  callback?: PluginCallback,
):void {
  reporter.info('Gatsby source sylius onpostbootstrap');

  if (options) {
    reporter.info(JSON.stringify(options));
  }

  if (callback) {
    reporter.info(callback.toString());
  }
}
