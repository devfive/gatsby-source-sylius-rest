import { RestClient, IRestResponse, IRequestOptions } from 'typed-rest-client/RestClient';

const userAgent: string = 'gatsby-source-sylius';

export interface RestDataProviderOptions {
  resourceName: string;
  url: string;
}

export class RestDataProvider<T> {
  private client: RestClient;
  private resourceName: string;
  private url: string;

  constructor({ resourceName, url }: RestDataProviderOptions) {
    this.resourceName = resourceName;
    this.url = url;
    this.client = new RestClient(userAgent);
  }

  public async getRecords(options?: IRequestOptions):Promise<T[] | null> {
    const url: string = this.getResourceUrl();
    const response: IRestResponse<T[]> = await this.client.get(url, options);

    return response.result;
  }

  public async getRecord(id: number | string, options?: IRequestOptions):Promise<T | null> {
    const url: string = this.getSingleResourcePath(id);
    const response: IRestResponse<T> = await this.client.get(url, options);

    return response.result;
  }

  private getSingleResourcePath(id: number | string): string {
    return `${this.getResourceUrl()}/${id}`;
  }

  private getResourceUrl(): string {
    return `${this.url}/${this.resourceName}`;
  }
}
