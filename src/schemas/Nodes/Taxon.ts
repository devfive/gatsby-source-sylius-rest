import { NodeInput } from 'gatsby';

export interface BaseTaxonNode {
  code: string,
  description: string,
  name: string,
  locale: string,
  position: number,
  slug: string,
}

export type TaxonNode = BaseTaxonNode & NodeInput;
