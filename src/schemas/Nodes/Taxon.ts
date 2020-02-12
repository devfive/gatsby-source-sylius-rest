import { NodeInput } from 'gatsby';

export interface TaxonNode extends NodeInput {
  code: string,
  name: string,
  slug: string,
  position: number,
  description: string,
}
