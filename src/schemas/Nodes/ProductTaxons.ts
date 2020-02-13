import { ComposeObjectTypeConfig } from 'graphql-compose';

export const productTaxonsSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProductTaxons',
  fields: {
    main: 'String',
    others: '[String]',
  },
};
