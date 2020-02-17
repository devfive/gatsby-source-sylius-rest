import { IRequestOptions } from 'typed-rest-client';
import { SyliusProduct } from '../../schemas/Sylius/Product';
import { RestDataProvider, RestDataProviderOptions } from './RestDataProvider';

export type LatestProductsProviderOptions = Omit<RestDataProviderOptions, 'resourceName'>;

export class LatestProductsProvider extends RestDataProvider<SyliusProduct> {
  constructor(options: LatestProductsProviderOptions) {
    super({
      ...options,
      resourceName: 'product-latest',
    });
  }

  public async getRecords(options?: IRequestOptions):Promise<SyliusProduct[] | null> {
    const defaultQueryParams: object = {
      limit: 10000,
    };

    const requestOptions: IRequestOptions = {
      ...options,
      responseProcessor: this.processResponse.bind(this),
      queryParameters: {
        ...options?.queryParameters,
        params: {
          ...defaultQueryParams,
          ...options?.queryParameters?.params,
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
