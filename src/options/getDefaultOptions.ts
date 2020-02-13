import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from '../schemas/Plugin/Options';


export const defaultOptions: SyliusSourcePluginOptions = {
  debug: false,
  locales: [],
  pages: [],
  plugins: [],
};

export function getDefaultOptions(
  options: PartialSyliusSourcePluginOptions,
): SyliusSourcePluginOptions {
  return {
    ...defaultOptions,
    ...options,
  };
}
