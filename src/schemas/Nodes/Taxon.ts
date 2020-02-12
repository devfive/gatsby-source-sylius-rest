import { NodeInput } from 'gatsby';

export interface TaxonNode extends NodeInput {
  code: string,
  description: string,
  name: string,
  position: number,
  slug: string,
}
