import { RestClient, IRestResponse } from 'typed-rest-client/RestClient';

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

  public async getRecords():Promise<T[] | null> {
    const response: IRestResponse<T[]> = await this.client.get(this.getResourceUrl());

    return response.result;
  }

  public async getRecord(id: number | string):Promise<T | null> {
    const response: IRestResponse<T> = await this.client.get(this.getSingleResourcePath(id));

    return response.result;
  }

  private getSingleResourcePath(id: number | string): string {
    return `${this.getResourceUrl()}/${id}`;
  }

  private getResourceUrl(): string {
    return `${this.url}/${this.resourceName}`;
  }
}
