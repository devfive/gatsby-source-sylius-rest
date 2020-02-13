import { PluginOptions } from 'gatsby';

export type PartialSyliusSourcePluginOptions = PluginOptions & Partial<SyliusSourcePluginOptions>;

export type SyliusSourcePluginOptions = PluginOptions & SyliusSourcePluginOptionsInterface;

interface SyliusSourcePluginOptionsInterface extends PluginOptions {
  components: SyliusSourcePluginComponents;
  debug: boolean;
  locales: string[];
  url?: string;
}

export interface SyliusSourcePluginComponents {
  taxonsPage: string;
}
