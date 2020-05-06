import { SourceNodesArgs } from 'gatsby';
import { sourceProducts } from './actions/source/sourceProducts';
import { sourceTaxons } from './actions/source/sourceTaxons';
import { getDefaultOptions } from './options/getDefaultOptions';
import {
  PartialSyliusSourcePluginOptions,
  SyliusSourcePluginOptions,
} from './schemas/Plugin/Options';
import { reportDebug } from './utils/reportDebug';

export async function sourceNodes(
  args: SourceNodesArgs,
  pluginOptions: PartialSyliusSourcePluginOptions,
): Promise<any> {
  const options: SyliusSourcePluginOptions = getDefaultOptions(pluginOptions);
  const {
    reporter,
  } = args;
  reportDebug(reporter, options, '------------');
  reportDebug(reporter, options, 'Source nodes');
  reportDebug(reporter, options, '------------');

  await sourceTaxons(args, options);
  await sourceProducts(args, options);
}
