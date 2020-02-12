import { SyliusTaxon } from '../schemas/Sylius/Taxon';
import { RestDataProvider, RestDataProviderOptions } from './RestDataProvider';

export type TaxonsProviderOptions = Omit<RestDataProviderOptions, 'resourceName'>;

export class TaxonsProvider extends RestDataProvider<SyliusTaxon> {
  constructor(options: TaxonsProviderOptions) {
    super({
      ...options,
      resourceName: 'taxons',
    });
  }
}
