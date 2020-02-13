import { ComposeObjectTypeConfig } from 'graphql-compose';

export interface BaseProductTaxonsNode {
  main: string;
  others: string[];
}

export const productTaxonsSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProductTaxons',
  fields: {
    main: 'String',
    others: '[String]',
  },
};
