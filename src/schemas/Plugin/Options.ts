import { PluginOptions } from 'gatsby';

export interface SyliusSourcePluginOptions extends PluginOptions {
  debug?: boolean;
  locales?: string[];
  url?: string;
  components: SyliusSourcePluginComponents;
}

export interface SyliusSourcePluginComponents {
  taxonsPage: string;
}

export const defaultOptions: SyliusSourcePluginOptions = {
  debug: false,
  plugins: [],
  locales: [],
  components: {
    taxonsPage: '',
  },
};
