import { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose';

export interface BaseProductTaxonsNode {
  main: string;
  others: string[];
}

export const productTaxonsSchema: ObjectTypeComposerAsObjectDefinition<any, any> = {
  name: 'SyliusProductTaxons',
  fields: {
    main: 'String',
    others: '[String]',
  },
};
