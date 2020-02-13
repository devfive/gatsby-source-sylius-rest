import { RestDataProvider } from './providers/RestDataProvider';


export interface LocalizedCollection<T> {
  collection: T[];
  locale: string;
}

export async function getLocalizedCollections<T>(
  dataProvider: RestDataProvider<T>,
  locales: string[],
): Promise<Array<LocalizedCollection<T>>> {
  return Promise.all(locales.map(async (locale: string) => {
    const collection: T[] | null = await dataProvider.getRecords({
      queryParameters: {
        params: { locale },
      },
    });

    return {
      collection: collection || [],
      locale,
    };
  }));
}
