import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from '../schemas/Plugin/Options';


export const defaultOptions: SyliusSourcePluginOptions = {
  debug: false,
  locales: [],
  pages: [],
  plugins: [],
  schemas: {
    associationType: {},
    image: {},
    product: {},
    productPrice: {},
    productTaxons: {},
    productVariant: {},
    taxon: {},
  },
};

export function getDefaultOptions(
  options: PartialSyliusSourcePluginOptions,
): SyliusSourcePluginOptions {
  return {
    ...defaultOptions,
    ...options,
    schemas: {
      ...defaultOptions.schemas,
      ...options.schemas,
    },
  };
}
