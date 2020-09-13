import { flatten } from 'lodash';
import { LocalizedTaxons } from '../actions/source/sourceTaxons';
import { LocalizedProducts } from '../actions/source/sourceProducts';
import { LocalizedCollection } from './getLocalizedCollections';
import { TaxonProductsProvider } from './providers/TaxonProductsProvider';
import { SyliusTaxon, SyliusProduct } from '../schemas/Sylius';

export async function getAllTaxonsProducts(
  url: string,
  localizedTaxons: LocalizedTaxons,
): Promise<LocalizedProducts> {
  const promises: Array<Promise<LocalizedCollection<SyliusProduct>>> = localizedTaxons
    .map((localeTaxons: LocalizedCollection<SyliusTaxon>) => {
      return getLocaleProducts(url, localeTaxons);
    });


  return Promise.all(promises);
}

async function getLocaleProducts(
  url: string,
  localeTaxons: LocalizedCollection<SyliusTaxon>,
): Promise<LocalizedCollection<SyliusProduct>> {
  const { collection, locale } = localeTaxons;

  const taxons: SyliusTaxon[] = flattenTaxons(collection);
  const promises: Array<Promise<Array<SyliusProduct>>> = taxons
    .map(async (taxon: SyliusTaxon) => {
      const productsProvider: TaxonProductsProvider = new TaxonProductsProvider({
        url,
        taxonCode: taxon.code,
      });

      const taxonProducts: SyliusProduct[] | null = await productsProvider.getRecords({
        queryParameters: {
          params: {
            locale,
          },
        },
      });

      return taxonProducts || [];
    });

  const taxonsProducts: SyliusProduct[][] = await Promise.all(promises);
  const products: SyliusProduct[] = flatten(taxonsProducts);

  return {
    collection: products,
    locale,
  };
}

function flattenTaxons(taxons: SyliusTaxon[]): SyliusTaxon[] {
  return taxons.reduce((flattened: SyliusTaxon[], taxon: SyliusTaxon) => {
    const { children } = taxon;

    return [
      ...flattened,
      taxon,
      ...flattenTaxons(children),
    ];
  }, []);
}
