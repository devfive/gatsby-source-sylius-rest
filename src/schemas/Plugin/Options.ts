import { PluginOptions } from 'gatsby';

export type PartialSyliusSourcePluginOptions = PluginOptions & Partial<SyliusSourcePluginOptions>;

export type SyliusSourcePluginOptions = PluginOptions & SyliusSourcePluginOptionsInterface;

interface SyliusSourcePluginOptionsInterface extends PluginOptions {
  debug: boolean;
  locales: string[];
  pages: SyliusSourcePluginPageDefinition[];
  url?: string;
}

export interface SyliusSourcePluginPageDefinition {
  component: string;
  path?: string;
  type: SyliusSourcePluginPagesType;
}

export enum SyliusSourcePluginPagesType {
  TAXON = 'taxon',
}
