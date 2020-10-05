import { PluginOptions } from 'gatsby';

export type SyliusSourcePluginOptions = PluginOptions & SyliusSourcePluginOptionsInterface;

export type PartialSyliusSourcePluginOptions =
  PluginOptions
    & Omit<Partial<SyliusSourcePluginOptions>, 'limits' | 'schemas'>
    & {
      schemas?: PartialSyliusSourcePluginSchema;
    }
    & {
      limits?: Partial<SyliusSourcePluginLimits>;
    };

export type PartialSyliusSourcePluginSchema = Partial<SyliusSourcePluginSchema>;

export interface SyliusSourcePluginOptionsInterface {
  debug: boolean;
  limits: SyliusSourcePluginLimits;
  locales: string[];
  pages: SyliusSourcePluginPageDefinition[];
  schemas: SyliusSourcePluginSchemas;
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

export interface SyliusSourcePluginSchemas {
  associationType: SyliusSourcePluginSchema;
  image: SyliusSourcePluginSchema;
  product: SyliusSourcePluginSchema;
  productPrice: SyliusSourcePluginSchema;
  productTaxons: SyliusSourcePluginSchema;
  productVariant: SyliusSourcePluginSchema;
  taxon: SyliusSourcePluginSchema;
}

export interface SyliusSourcePluginLimits {
  products: number;
}

export interface SyliusSourcePluginSchema {
  [key: string]: any;
}
