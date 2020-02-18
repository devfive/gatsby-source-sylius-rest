import { SyliusTaxon } from '../schemas/Sylius';
import { TaxonsProvider } from './providers/TaxonsProvider';
import { getLocalizedCollections, LocalizedCollection } from './getLocalizedCollections';

export async function getAllTaxons(
  url: string,
  locales: string[],
): Promise<Array<LocalizedCollection<SyliusTaxon>>> {
  const taxonsProvider: TaxonsProvider = new TaxonsProvider({ url });

  return getLocalizedCollections(taxonsProvider, locales);
}
