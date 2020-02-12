import { PluginOptions } from 'gatsby';

export interface SourceSyliusPluginOptions extends PluginOptions {
  debug?: boolean;
  locales?: string[];
}

export const defaultOptions: SourceSyliusPluginOptions = {
  debug: false,
  plugins: [],
  locales: [],
};
