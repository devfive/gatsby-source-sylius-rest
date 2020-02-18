import { resolve } from 'path';
import { getValueFromJson } from './getValueFromJson';

export function getPackageVersion(
  path: string = resolve(__dirname, '../../', 'package.json'),
): string | undefined {
  return getValueFromJson<string | undefined>('version', path, undefined);
}
