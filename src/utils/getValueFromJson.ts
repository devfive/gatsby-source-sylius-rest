import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getValueFromJson<T = string>(
  property: string,
  path: string = resolve(__dirname, '../../', 'package.json'),
  defaultValue: T,
): T {
  const content: string = readFileSync(path).toString();

  try {
    const packageJson: { [key: string]: T | undefined } = JSON.parse(content);
    return packageJson[property] || defaultValue;
  } catch (e) {
    return defaultValue;
  }
}
