import { ComposeObjectTypeConfig } from 'graphql-compose';
import { BaseProductPriceNode } from './ProductPrice';

export interface BaseProductVariantNode {
  axis: string[];
  code: string;
  // images: SyliusImage[];
  nameAxis: { [key: string]: string };
  originalPrice: BaseProductPriceNode;
  price: BaseProductPriceNode;
}


export const productVariantSchema: ComposeObjectTypeConfig<any, any> = {
  name: 'SyliusProductVariant',
  fields: {
    axis: '[String]!',
    code: 'String!',
    // images: 'SyliusImage[]',
    nameAxis: 'JSON!',
    originalPrice: 'SyliusProductPrice!',
    price: 'SyliusProductPrice!',
  },
};
