import { PluginOptions } from 'gatsby';

export interface SourceSyliusPluginOptions extends PluginOptions {
  debug?: boolean;
  locales?: string[];
  url?: string;
}

export const defaultOptions: SourceSyliusPluginOptions = {
  debug: false,
  plugins: [],
  locales: [],
};
