import { IRequestOptions } from 'typed-rest-client';
import { SyliusProduct } from '../../schemas/Sylius';
import { RestDataProvider, RestDataProviderOptions } from './RestDataProvider';

export type TaxonProductsProviderOptions = Omit<RestDataProviderOptions, 'resourceName'> & {
  taxonCode: string,
};

export class TaxonProductsProvider extends RestDataProvider<SyliusProduct> {
  constructor(options: TaxonProductsProviderOptions) {
    const { taxonCode, ...rest } = options;

    super({
      ...rest,
      resourceName: `taxon-products/by-code/${taxonCode}`,
    });
  }

  public async getRecords(options?: IRequestOptions):Promise<SyliusProduct[] | null> {
    let records: SyliusProduct[] = [];
    let paginatedRecords: SyliusProduct[] | null;
    let page: number = 1;

    // eslint-disable-next-line no-cond-assign, no-await-in-loop
    while (paginatedRecords = await this.getPaginatedRecords(page, 10, options)) {
      if (paginatedRecords) {
        records = [
          ...records,
          ...paginatedRecords,
        ];
      }

      page += 1;
    }

    return records;
  }

  private async getPaginatedRecords(
    page: number = 1,
    limit: number = 10,
    options?: IRequestOptions,
  ):Promise<SyliusProduct[] | null> {
    const requestOptions: IRequestOptions = {
      ...options,
      responseProcessor: this.processResponse.bind(this),
      queryParameters: {
        ...options?.queryParameters,
        params: {
          ...options?.queryParameters?.params,
          page,
          limit,
        },
      },
    };

    return super.getRecords(requestOptions);
  }

  // eslint-disable-next-line class-methods-use-this
  private processResponse(response: { items: SyliusProduct[] }): SyliusProduct[] {
    return response.items;
  }
}
