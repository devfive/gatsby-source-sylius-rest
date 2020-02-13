import { PluginOptions } from 'gatsby';

export type PartialSyliusSourcePluginOptions = PluginOptions & Partial<SyliusSourcePluginOptions>;

export type SyliusSourcePluginOptions = PluginOptions & SyliusSourcePluginOptionsInterface;

interface SyliusSourcePluginOptionsInterface extends PluginOptions {
  components: SyliusSourcePluginComponents;
  debug: boolean;
  locales: string[];
  pages: SyliusSourcePluginPageDefinition[];
  url?: string;
}

export interface SyliusSourcePluginPageDefinition {
  component: string;
  type: SyliusSourcePluginPagesType;
}

export enum SyliusSourcePluginPagesType {
  TAXON = 'taxon',
}

export interface SyliusSourcePluginComponents {
  taxonsPage: string;
}
