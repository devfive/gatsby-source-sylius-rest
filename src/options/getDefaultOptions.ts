import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from '../schemas/Plugin/Options';


export const defaultOptions: SyliusSourcePluginOptions = {
  debug: false,
  limits: {
    products: 10,
  },
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
    limits: {
      ...defaultOptions.limits,
      ...options.limits,
    },
    schemas: {
      ...defaultOptions.schemas,
      ...options.schemas,
    },
  };
}
