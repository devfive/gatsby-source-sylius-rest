import { SyliusProduct } from '../schemas/Sylius/Product';
import { LatestProductsProvider } from './providers/LatestProductsProvider';
import { getLocalizedCollections, LocalizedCollection } from './getLocalizedCollections';

export async function getAllLatestProducts(
  url: string,
  locales: string[],
): Promise<Array<LocalizedCollection<SyliusProduct>>> {
  const latestsProductsProvider: LatestProductsProvider = new LatestProductsProvider({ url });

  return getLocalizedCollections(latestsProductsProvider, locales);
}
