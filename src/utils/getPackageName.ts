import { resolve } from 'path';
import { getValueFromJson } from './getValueFromJson';

const DEFAULT_NAME: string = 'gatsby-source-sylius-rest';

export function getPackageName(
  path: string = resolve(__dirname, '../../', 'package.json'),
): string {
  return getValueFromJson<string>('name', path, DEFAULT_NAME);
}
