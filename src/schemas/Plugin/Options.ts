import { PluginOptions } from 'gatsby';

export type SyliusSourcePluginOptions = PluginOptions & SyliusSourcePluginOptionsInterface;

export type PartialSyliusSourcePluginOptions = PluginOptions & Partial<SyliusSourcePluginOptions>;

export interface SyliusSourcePluginOptionsInterface {
  debug: boolean;
  locales: string[];
  pages: SyliusSourcePluginPageDefinition[];
  url?: string;
}

export interface SyliusSourcePluginPageDefinition {
  component: string;
  path?: SyliusSourcePluginPagePath;
  type: SyliusSourcePluginPagesType;
}

export type SyliusSourcePluginPageLocalizedPathMap = { [locale: string]: string };
export type SyliusSourcePluginPagePath = string | SyliusSourcePluginPageLocalizedPathMap;

export enum SyliusSourcePluginPagesType {
  PRODUCT = 'product',
  TAXON = 'taxon',
}
