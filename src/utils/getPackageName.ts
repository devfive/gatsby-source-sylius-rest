import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getPackageName(): string {
  const path: string = resolve(__dirname, '../../', 'package.json');
  const content: string = readFileSync(path).toString();

  try {
    const packageJson: { name: string } = JSON.parse(content);
    return packageJson.name;
  } catch (e) {
    return '';
  }
}
