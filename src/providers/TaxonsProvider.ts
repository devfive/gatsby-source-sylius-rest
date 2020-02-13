import { IRequestOptions } from 'typed-rest-client';
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

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public async getRecords(options?: IRequestOptions):Promise<SyliusTaxon[]> {
    // eslint-disable-next-line quotes
    const taxons: SyliusTaxon[] = JSON.parse(`[{"code":"category","name":"Kategoria","slug":"kategoria","position":0,"children":[{"code":"boxes","name":"Pudełka","slug":"kategorie/pudelka","position":0,"children":[],"images":[]},{"code":"invitations","name":"Zaproszenia","slug":"kategoria/zaproszenia","position":1,"children":[],"images":[]},{"code":"gifts","name":"Podziękowania","slug":"kategoria/podziekowania","position":2,"children":[],"images":[]},{"code":"labels","name":"Naklejki","slug":"kategoria/naklejki","position":3,"children":[{"code":"bottle-labels","name":"Na butelkę","slug":"kategoria/naklejki/na-butelke","position":0,"children":[],"images":[]}],"images":[]},{"code":"bottle-tickets","name":"Zawieszki","slug":"kategoria/zawieszki","position":4,"children":[],"images":[]},{"code":"menu","name":"Menu","slug":"kategoria/menu","position":5,"children":[],"images":[]},{"code":"table-numbers","name":"Numery stołów","slug":"kategoria/numery-stolow","position":6,"children":[],"images":[]},{"code":"welcome-posters","name":"Plakaty powitalne","slug":"kategoria/plakaty-powitalne","position":7,"children":[],"images":[]},{"code":"table-plan","name":"Plan stołów","slug":"kategoria/plan-stolow","position":8,"children":[],"images":[]},{"code":"tickets","name":"Bileciki","slug":"kategoria/bileciki","position":9,"children":[],"images":[]},{"code":"vignettes","name":"Winietki","slug":"kategoria/winietki","position":10,"children":[],"images":[]}],"images":[]}]`) as SyliusTaxon[];

    // eslint-disable-next-line no-console
    console.log(taxons);
    return taxons;
  }
}
