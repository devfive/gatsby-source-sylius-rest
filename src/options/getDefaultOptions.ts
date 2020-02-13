import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from '../schemas/Plugin/Options';


export const defaultOptions: SyliusSourcePluginOptions = {
  components: {
    taxonsPage: '',
  },
  debug: false,
  locales: [],
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
