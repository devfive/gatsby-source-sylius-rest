import { PluginOptions } from 'gatsby';

export interface SyliusSourcePluginOptions extends PluginOptions {
  debug?: boolean;
  locales?: string[];
  url?: string;
}

export const defaultOptions: SyliusSourcePluginOptions = {
  debug: false,
  plugins: [],
  locales: [],
};
